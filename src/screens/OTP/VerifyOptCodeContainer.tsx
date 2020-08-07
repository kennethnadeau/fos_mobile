import React, { FC } from "react";
import { useDispatch, connect } from "react-redux";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { apiService } from "@fos/shared";
import VerifyOtpCode, {
  VerificationCodeStatus,
} from "@fos/components/Account/VerifyOtpCode";
import {
  setOtpCode,
  setOtpCodeVerificationStatus,
  setRegistrationUuid,
} from "@fos/redux/reducers/otpReducer";

import { goToWelcomeScreen } from "helpers/navigation";

const { account, otp } = apiService;

type VerifyOtpCodeContainerProps = {
  otpForm: {
    countryCode: string;
    mobileNumber: string;
    otpCode: string;
    otpCodeVerificationStatus: VerificationCodeStatus;
  };
  otpCodeInputRef: React.MutableRefObject<OTPInputView | null>;
  formatPhoneNumber: () => string;
  goToNextStep: () => void;
  setShowInvalidCodeAlert: (show: boolean) => void;
  setShowResendAlert: (show: boolean) => void;
  setShowSpinner: (show: boolean) => void;
  login?: boolean;
};

const VerifyOtpCodeContainer: FC<VerifyOtpCodeContainerProps> = (props) => {
  const {
    login,
    otpForm,
    otpCodeInputRef,
    formatPhoneNumber,
    goToNextStep,
    setShowInvalidCodeAlert,
    setShowSpinner,
    setShowResendAlert,
  } = props;
  const {
    countryCode,
    mobileNumber,
    otpCode,
    otpCodeVerificationStatus,
  } = otpForm;

  const dispatch = useDispatch();
  const codeChange = (code: string) => {
    dispatch(setOtpCode(code));
  };

  const handleOtpCodeResend = () => setShowResendAlert(true);

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
        dispatch(setOtpCodeVerificationStatus("verified"));
        goToWelcomeScreen(`${userInfo.firstName} ${userInfo.lastName}`);
      } catch (error) {
        setShowInvalidCodeAlert(true);
        dispatch(setOtpCodeVerificationStatus("invalid"));
      } finally {
        setShowSpinner(false);
      }
    } else {
      try {
        const { data } = await otp.postOtpRegistrationVerify(requestData);
        dispatch(setRegistrationUuid(data.uuid));
        dispatch(setOtpCodeVerificationStatus("verified"));
        goToNextStep();
      } catch (e) {
        setShowInvalidCodeAlert(true);
        dispatch(setOtpCodeVerificationStatus("invalid"));
      } finally {
        setShowSpinner(false);
      }
    }
  };

  return (
    <VerifyOtpCode
      code={otpCode}
      mobileNumber={`${countryCode}${mobileNumber}`}
      onCodeChange={codeChange}
      onCodeFilled={handleOtpCodeVerification}
      onResendPress={handleOtpCodeResend}
      ref={otpCodeInputRef}
      verificationStatus={otpCodeVerificationStatus}
    />
  );
};

const mapStateToProps = (state: any) => ({
  otpForm: state.otp,
});

export default connect(mapStateToProps)(VerifyOtpCodeContainer);
