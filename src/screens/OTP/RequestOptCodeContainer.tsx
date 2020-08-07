import React, { FC, useState } from "react";
import { useDispatch, connect } from "react-redux";

import RequestOtpCode from "@fos/components/Account/RequestOtpCode";
import { setCountryCode, setMobileNumber } from "@fos/redux/slices/otpSlice";

type RequestOtpCodeContainerProps = {
  countryCode: string,
  mobileNumber: string;
};

const RequestOtpCodeContainer: FC<RequestOtpCodeContainerProps> = (props) => {
  console.log('REQ CONTAINER', props)
  const { countryCode, mobileNumber } = props;
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
    // try {
    //   await sendOtpCode();
    //   setOtpRequestStatus("sent");
    //   goToNextStep();
    // } catch (e) {
    //   setToastMessage("Whoops! Something went wrong!");
    // } finally {
    //   setOtpRequestStatus("idle");
    // }
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
