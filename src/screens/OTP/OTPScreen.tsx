import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "@fos/components/Toast";
import { SCREENS } from "@fos/constants";
import { setPaginationDotsLength } from "@fos/redux/slices/navigationSlice";
import { apiService } from "@fos/shared";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { clearOtpForm } from "redux/reducers/otpReducer";

import { CarouselItems } from "./CarouselItems";
import EnterEmailAddressContainer from "./EnterEmailAddressContainer";
import NameContainer from "./NameContainer";
import RequestOtpCodeContainer from "./RequestOptCodeContainer";
import VerifyOtpCodeContainer from "./VerifyOptCodeContainer";
import InvalidCodeAlertContainer from "./InvalidCodeAlertContainer";
import ResendCodeAlertContainer from "./ResendCodeAlertContainer";
import { selectOtpState } from "redux/selectors/otpSelectors";
import { selectToastMessage } from "redux/selectors/toastSelectors";

const { otp } = apiService;

type CarouselItem = "requestCode" | "verifyCode" | "emailAddress" | "name";

type OTPScreenProps = {
  login?: boolean;
};

const OTPScreen: ScreenFC<OTPScreenProps> = (props: any) => {
  const { login } = props;
  const dispatch = useDispatch();
  const otpState = useSelector(selectOtpState);
  const toastMessage = useSelector(selectToastMessage);
  const { countryCode, mobileNumber } = otpState;

  const carouselRef = useRef<Carousel<CarouselItem>>(null);
  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const [showSpinner, setShowSpinner] = useState(false);

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
      />
    ),
  };

  const renderSlides = ({ item }: { item: CarouselItem }) =>
    carouselItemMap[item];

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
      <Toast toastMessage={toastMessage} />
      {/* TODO: move showResendAlert to redux?? */}
      <ResendCodeAlertContainer
        sendOtpCode={sendOtpCode}
        setShowResendAlert={setShowResendAlert}
        setShowSpinner={setShowSpinner}
        showResendAlert={showResendAlert}
      />
      <InvalidCodeAlertContainer
        setShowInvalidCodeAlert={setShowInvalidCodeAlert}
        showInvalidCodeAlert={showInvalidCodeAlert}
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
