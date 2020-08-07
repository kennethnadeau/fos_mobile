import React, { FC, useState } from "react";
import { useDispatch, connect } from "react-redux";

import RequestOtpCode from "@fos/components/Account/RequestOtpCode";
import {
  setCountryCode,
  setMobileNumber,
} from "@fos/redux/reducers/otpReducer";

type RequestOtpCodeContainerProps = {
  countryCode: string;
  mobileNumber: string;
  goToNextStep: () => void;
  sendOtpCode: () => void;
  setToastMessage: (message: string) => void;
};

const RequestOtpCodeContainer: FC<RequestOtpCodeContainerProps> = (props) => {
  const {
    countryCode,
    mobileNumber,
    sendOtpCode,
    goToNextStep,
    setToastMessage,
  } = props;
  const dispatch = useDispatch();

  const [otpRequestStatus, setOtpRequestStatus] = useState<
    "sending" | "sent" | "idle"
  >("idle");

  const updateCountryCode = (code: string) => {
    dispatch(setCountryCode(code));
  };
  const clearMobileNumber = () => {
    dispatch(setMobileNumber(""));
  };
  const updateMobileNumber = (mobile: string) => {
    dispatch(setMobileNumber(mobile));
  };

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

  return (
    <RequestOtpCode
      {...{ countryCode, mobileNumber }}
      loading={otpRequestStatus === "sending"}
      onCountryCodeChange={updateCountryCode}
      onMobileNumberChangeText={updateMobileNumber}
      onMobileNumberClear={clearMobileNumber}
      onRequestCodePress={handleOtpCodeRequest}
    />
  );
};

const mapStateToProps = (state: any) => ({
  countryCode: state.otp.countryCode,
  mobileNumber: state.otp.mobileNumber,
});

export default connect(mapStateToProps)(RequestOtpCodeContainer);
