import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "@fos/components/Alert";
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
import {
  clearOtpForm,
  setOtpCodeVerificationStatus,
} from "@fos/redux/reducers/otpReducer";

import { CarouselItems } from "./CarouselItems";
import EnterEmailAddressContainer from "./EnterEmailAddressContainer";
import NameContainer from "./NameContainer";
import RequestOtpCodeContainer from "./RequestOptCodeContainer";
import VerifyOtpCodeContainer from "./VerifyOptCodeContainer";

const { otp } = apiService;

type CarouselItem = "requestCode" | "verifyCode" | "emailAddress" | "name";

type OTPScreenProps = {
  countryCode: string;
  mobileNumber: string;
  login?: boolean;
};

// TODO: clear all states on load
const OTPScreen: ScreenFC<OTPScreenProps> = (props: any) => {
  const { countryCode, login, mobileNumber } = props;
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();

  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const [showSpinner, setShowSpinner] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showResendAlert, setShowResendAlert] = useState(false);
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);

  useLayoutEffect(() => {
    dispatch(clearOtpForm());
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

  const carouselItemMap: { [key in CarouselItem]: JSX.Element } = {
    requestCode: (
      <RequestOtpCodeContainer
        goToNextStep={goToNextStep}
        sendOtpCode={sendOtpCode}
        setToastMessage={setToastMessage}
      />
    ),
    verifyCode: (
      <VerifyOtpCodeContainer
        formatPhoneNumber={formatPhoneNumber}
        goToNextStep={goToNextStep}
        login={login}
        otpCodeInputRef={otpCodeInputRef}
        setShowInvalidCodeAlert={setShowInvalidCodeAlert}
        setShowResendAlert={setShowResendAlert}
        setShowSpinner={setShowSpinner}
      />
    ),
    emailAddress: <EnterEmailAddressContainer goToNextStep={goToNextStep} />,
    name: (
      <NameContainer
        formatPhoneNumber={formatPhoneNumber}
        setShowSpinner={setShowSpinner}
        setToastMessage={setToastMessage}
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
  countryCode: state.otp.countryCode || "",
  mobileNumber: state.otp.mobileNumber || "",
  registrationUuid: state.otp.registrationUuid || "",
});

export default connect(mapStateToProps)(OTPScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
