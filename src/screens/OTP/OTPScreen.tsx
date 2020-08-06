import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Alert from "@fos/components/Alert";
import EnterEmailAddress from "@fos/components/Account/EnterEmailAddress";
import Name from "@fos/components/Account/EnterName";
import RequestOtpCode from "@fos/components/Account/RequestOtpCode";
import VerifyOtpCode, {
  VerificationCodeStatus,
} from "@fos/components/Account/VerifyOtpCode";
import Toast from "components/Toast/index.ts";
import { SCREENS } from "@fos/constants";
import {
  setPaginationDotsLength,
  updatePaginationActiveDotIndex,
} from "@fos/redux/slices/navigationSlice";
import { apiService } from "@fos/shared";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { goToWelcomeScreen } from "helpers/navigation";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
const { account, otp } = apiService;

type CarouselItem = "requestCode" | "verifyCode" | "emailAddress" | "name";

const carouselItems: Array<CarouselItem> = [
  "requestCode",
  "verifyCode",
  "emailAddress",
  "name",
];

type OTPScreenProps = {
  login?: boolean;
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window",
);

const OTPScreen: ScreenFC<OTPScreenProps> = ({ login }) => {
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();

  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const [countryCode, setCountryCode] = useState("+1");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpRequestStatus, setOtpRequestStatus] = useState<
    "sending" | "sent" | "idle"
  >("idle");
  const [otpCode, setOtpCode] = useState("");
  const [otpCodeVerificationStatus, setOtpCodeVerificationStatus] = useState<
    VerificationCodeStatus
  >("unverified");
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationUuid, setRegistrationUuid] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showResendAlert, setShowResendAlert] = useState(false);
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);

  const clearMobileNumber = () => setMobileNumber("");
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

  const handleOtpCodeRequest = async () => {
    setOtpRequestStatus("sending");

    try {
      await sendOtpCode();
      setOtpRequestStatus("sent");
      goToNextStep();
    } catch (e) {
      setToastMessage("Whoops! Something went wrong!");
    } finally {
      setOtpRequestStatus("idle");
    }
  };

  const handleOtpCodeResend = () => setShowResendAlert(true);

  const handleOnSnapToItem = (slideIndex: number) => {
    if (slideIndex === 1) {
      otpCodeInputRef.current?.focusField(0);
    }
    dispatch(updatePaginationActiveDotIndex(slideIndex));
  };

  const handleOtpCodeVerification = async (code: string) => {
    setShowSpinner(true);

    const requestData = {
      code,
      phone: formatPhoneNumber(),
    };

    if (login) {
      try {
        const {
          data: otpVerificationResponse,
        } = await otp.postOtpAuthenticateVerify(requestData);
        const { data: userInfo } = await account.getUserInfo(
          otpVerificationResponse.token,
        );

        setOtpCodeVerificationStatus("verified");
        goToWelcomeScreen(`${userInfo.firstName} ${userInfo.lastName}`);
      } catch (error) {
        setShowInvalidCodeAlert(true);
        setOtpCodeVerificationStatus("invalid");
      } finally {
        setShowSpinner(false);
      }
    } else {
      try {
        const { data } = await otp.postOtpRegistrationVerify(requestData);
        setRegistrationUuid(data.uuid);
        setOtpCodeVerificationStatus("verified");
        goToNextStep();
      } catch (e) {
        setShowInvalidCodeAlert(true);
        setOtpCodeVerificationStatus("invalid");
      } finally {
        setShowSpinner(false);
      }
    }
  };

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
    requestCode: (
      <RequestOtpCode
        {...{ countryCode, mobileNumber }}
        loading={otpRequestStatus === "sending"}
        onCountryCodeChange={setCountryCode}
        onMobileNumberChangeText={setMobileNumber}
        onMobileNumberClear={clearMobileNumber}
        onRequestCodePress={handleOtpCodeRequest}
      />
    ),
    verifyCode: (
      <VerifyOtpCode
        code={otpCode}
        mobileNumber={`${countryCode}${mobileNumber}`}
        onCodeChange={setOtpCode}
        onCodeFilled={handleOtpCodeVerification}
        onResendPress={handleOtpCodeResend}
        ref={otpCodeInputRef}
        verificationStatus={otpCodeVerificationStatus}
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
        setOtpCodeVerificationStatus("unverified");
        setShowInvalidCodeAlert(false);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Carousel
        data={login ? carouselItems.slice(0, 2) : carouselItems}
        itemHeight={viewportHeight}
        itemWidth={viewportWidth}
        keyboardShouldPersistTaps="always"
        lockScrollWhileSnapping
        onSnapToItem={handleOnSnapToItem}
        ref={carouselRef}
        removeClippedSubviews
        renderItem={renderSlides}
        scrollEnabled={false}
        sliderWidth={viewportWidth}
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

export default OTPScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
