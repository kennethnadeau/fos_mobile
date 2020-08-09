import React, { useCallback, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { apiService } from "@fos/shared";
import { ScreenWrapper } from "@fos/components/ScreenWrapper";
import { SCREENS } from "@fos/constants";
import VerifyOtpCode from "@fos/components/Account/VerifyOtpCode";
import {
  setOtpCode,
  setOtpCodeVerificationStatus,
  setRegistrationUuid,
} from "@fos/redux/reducers/otpReducer";

import { goToWelcomeScreen, goToEnterEmailScreen } from "helpers/navigation";
import { ScreenFC } from "react-native-navigation-register-screens";

import {
  setShowInvalidCodeAlert,
  setShowSpinner,
  setShowResendAlert,
} from "@fos/redux/slices/flagsSlice";
import { selectOtpState } from "redux/selectors/otpSelectors";
import {
  setCurrentScreen,
  updatePaginationActiveDotIndex,
} from "redux/slices/navigationSlice";
import { getDotIndex } from "../helpers";

const { account, otp } = apiService;

// TODO: figure out type here
const VerifyOtpCodeScreen: ScreenFC<any> = (props) => {
  const { login, componentId } = props;

  const otpCodeInputRef = useRef<OTPInputView | null>(null);

  const dispatch = useDispatch();
  const otpForm = useSelector(selectOtpState);
  const {
    countryCode,
    mobileNumber,
    otpCode,
    otpCodeVerificationStatus,
  } = otpForm;

  useLayoutEffect(() => {
    dispatch(setCurrentScreen(SCREENS.REQUEST_CODE));
    const dotIndex = getDotIndex(SCREENS.VERIFY_CODE, login);
    dispatch(updatePaginationActiveDotIndex(dotIndex));
  }, [dispatch, login]);

  const codeChange = (code: string) => {
    dispatch(setOtpCode(code));
  };

  const handleOtpCodeResend = () => dispatch(setShowResendAlert(true));

  const formatPhoneNumber = useCallback(
    () => `${countryCode.replace("+", "")}${mobileNumber}`,
    [countryCode, mobileNumber],
  );

  const handleOtpCodeVerification = async (code: string) => {
    dispatch(setShowSpinner(true));

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
        dispatch(setOtpCodeVerificationStatus("verified"));
        goToWelcomeScreen(`${userInfo.firstName} ${userInfo.lastName}`);
      } catch (error) {
        dispatch(setShowInvalidCodeAlert(true));
        dispatch(setOtpCodeVerificationStatus("invalid"));
      } finally {
        dispatch(setShowSpinner(false));
      }
    } else {
      try {
        const { data } = await otp.postOtpRegistrationVerify(requestData);
        dispatch(setRegistrationUuid(data.uuid));
        dispatch(setOtpCodeVerificationStatus("verified"));
        goToEnterEmailScreen(componentId);
      } catch (e) {
        dispatch(setShowInvalidCodeAlert(true));
        dispatch(setOtpCodeVerificationStatus("invalid"));
      } finally {
        dispatch(setShowSpinner(false));
      }
    }
  };

  return (
    <ScreenWrapper login={login}>
      <VerifyOtpCode
        code={otpCode}
        mobileNumber={`${countryCode}${mobileNumber}`}
        onCodeChange={codeChange}
        onCodeFilled={handleOtpCodeVerification}
        onResendPress={handleOtpCodeResend}
        ref={otpCodeInputRef}
        verificationStatus={otpCodeVerificationStatus}
      />
    </ScreenWrapper>
  );
};

VerifyOtpCodeScreen.screenName = SCREENS.VERIFY_CODE;
VerifyOtpCodeScreen.options = {
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

export default VerifyOtpCodeScreen;
