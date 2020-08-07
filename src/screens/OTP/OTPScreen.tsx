import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "@fos/components/Alert";
import EnterEmailAddress from "@fos/components/Account/EnterEmailAddress";
import Name from "@fos/components/Account/EnterName";
import { Toast } from "@fos/components/Toast";
import { SCREENS } from "@fos/constants";
import { setPaginationDotsLength } from "@fos/redux/slices/navigationSlice";
import { apiService } from "@fos/shared";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { setOtpCodeVerificationStatus } from "@fos/redux/slices/otpSlice";

import { CarouselItems } from "./CarouselItems";
import RequestOtpCodeContainer from "./RequestOptCodeContainer";
import VerifyOtpCodeContainer from "./VerifyOptCodeContainer";

const { account, otp } = apiService;

type CarouselItem = "requestCode" | "verifyCode" | "emailAddress" | "name";

type OTPScreenProps = {
  countryCode: string;
  mobileNumber: string;
  login?: boolean;
};

const OTPScreen: ScreenFC<OTPScreenProps> = (props: any) => {
  console.log("props", props);
  const { countryCode, login, mobileNumber, registrationUuid } = props;
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();

  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showResendAlert, setShowResendAlert] = useState(false);
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);

  const clearEmailAddress = () => setEmailAddress("");
  const clearFirstName = () => setFirstName("");
  const clearLastName = () => setLastName("");

  useLayoutEffect(() => {
    dispatch(setPaginationDotsLength(login ? 2 : 4));
  }, [dispatch, login]);

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const formatPhoneNumber = useCallback(
    () => `${countryCode.replace("+", "")}${mobileNumber}`,
    [countryCode, mobileNumber],
  );

  const sendOtpCode = useCallback(() => {
    const postRequestMethod = login
      ? otp.postOtpAuthenticate
      : otp.postOtpRegistration;

    return postRequestMethod({ phone: formatPhoneNumber() });
  }, [formatPhoneNumber, login]);

  const handleOnCreateUserPress = async () => {
    setShowSpinner(true);
    try {
      await account.postAccountRegistration({
        email: emailAddress,
        firstName,
        lastName,
        phone: mobileNumber,
        registrationUuid,
      });
    } catch (e) {
      setToastMessage("Whoops! Something went wrong.");
    } finally {
      setShowSpinner(false);
    }
  };

  const carouselItemMap: { [key in CarouselItem]: JSX.Element } = {
    requestCode: <RequestOtpCodeContainer />,
    verifyCode: (
      <VerifyOtpCodeContainer
        goToNextStep={goToNextStep}
        otpCodeInputRef={otpCodeInputRef}
        setShowInvalidCodeAlert={setShowInvalidCodeAlert}
        setShowResendAlert={setShowResendAlert}
        setShowSpinner={setShowSpinner}
      />
    ),
    emailAddress: (
      <EnterEmailAddress
        emailAddress={emailAddress}
        onEmailAddressChangeText={setEmailAddress}
        onEmailClear={clearEmailAddress}
        onNextPress={goToNextStep}
      />
    ),
    name: (
      <Name
        {...{ firstName, lastName }}
        onCreateUserPress={handleOnCreateUserPress}
        onFirstNameChangeText={setFirstName}
        onFirstNameClear={clearFirstName}
        onLastNameChangeText={setLastName}
        onLastNameClear={clearLastName}
      />
    ),
  };

  const resendCodeAlertButtons = [
    {
      id: "no",
      title: t("NO"),
      onPress: () => setShowResendAlert(false),
    },
    {
      id: "yes",
      title: t("YES"),
      onPress: async () => {
        setShowSpinner(true);
        setShowResendAlert(false);

        try {
          await sendOtpCode();
          setToastMessage(t("Code Resent"));
        } catch {
          setToastMessage(t("Code Resend Failed"));
        } finally {
          setShowSpinner(false);
        }
      },
    },
  ];

  const renderSlides = ({ item }: { item: CarouselItem }) =>
    carouselItemMap[item];

  const invalidCodeAlertButtons = [
    {
      id: "try-again",
      title: t("Try Again"),
      onPress: () => {
        dispatch(setOtpCodeVerificationStatus("unverified"));
        setShowInvalidCodeAlert(false);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <CarouselItems
        carouselRef={carouselRef}
        login={login}
        otpCodeInputRef={otpCodeInputRef}
        renderSlides={renderSlides}
      />
      <Overlay isVisible={showSpinner}>
        <ActivityIndicator />
      </Overlay>
      <Toast isVisible={!!toastMessage} message={toastMessage} />
      <Alert
        body={t("Are you sure?")}
        buttons={resendCodeAlertButtons}
        header={t("Resend Code")}
        isVisible={showResendAlert}
      />
      <Alert
        buttons={invalidCodeAlertButtons}
        header={t("Invalid Code")}
        height={vs(120)}
        isVisible={showInvalidCodeAlert}
      />
    </SafeAreaView>
  );
};

OTPScreen.screenName = SCREENS.OTP;
OTPScreen.options = {
  topBar: {
    visible: false,
    rightButtons: [
      {
        id: SCREENS.COMPONENTS.TOP_BAR.QUESTION_MARK,
        component: {
          name: SCREENS.COMPONENTS.TOP_BAR.QUESTION_MARK,
        },
      },
    ],
  },
};

const mapStateToProps = (state: any) => ({
  countryCode: state.otp.countryCode,
  mobileNumber: state.otp.mobileNumber,
  registrationUuid: state.otp.registrationUuid,
});

export default connect(mapStateToProps)(OTPScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
