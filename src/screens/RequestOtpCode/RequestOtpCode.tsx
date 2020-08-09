import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ScreenWrapper } from "@fos/components/ScreenWrapper";
import { SCREENS } from "@fos/constants";
import { apiService } from "@fos/shared";
import { setToastMessage } from "@fos/redux/slices/toastSlice";
import RequestOtpCode from "@fos/components/Account/RequestOtpCode";
import {
  setCountryCode,
  setMobileNumber,
  clearOtpForm,
} from "redux/reducers/otpReducer";
import { selectOtpState } from "redux/selectors/otpSelectors";
import { ScreenFC } from "react-native-navigation-register-screens";
import { goToVerifyScreen } from "helpers/navigation";
import {
  setCurrentScreen,
  updatePaginationActiveDotIndex,
} from "redux/slices/navigationSlice";
import { getDotIndex } from "../helpers";

const { otp } = apiService;

// TODO: figure out type here
const RequestOtpCodeScreen: ScreenFC<any> = (props) => {
  const { login, componentId } = props;
  const dispatch = useDispatch();
  const otpState = useSelector(selectOtpState);

  const [otpRequestStatus, setOtpRequestStatus] = useState<
    "sending" | "sent" | "idle"
  >("idle");

  const { countryCode, mobileNumber } = otpState;
  const updateCountryCode = (code: string) => {
    dispatch(setCountryCode(code));
  };
  const clearMobileNumber = () => {
    dispatch(setMobileNumber(""));
  };
  const updateMobileNumber = (mobile: string) => {
    dispatch(setMobileNumber(mobile));
  };

  useLayoutEffect(() => {
    dispatch(clearOtpForm());
    dispatch(setCurrentScreen(SCREENS.REQUEST_CODE));
    const dotIndex = getDotIndex(SCREENS.REQUEST_CODE, login);
    dispatch(updatePaginationActiveDotIndex(dotIndex));
  }, [dispatch, login]);

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
      goToVerifyScreen(componentId, login);
    } catch (e) {
      dispatch(setToastMessage("Whoops! Something went wrong!"));
    } finally {
      setOtpRequestStatus("idle");
    }
  };

  return (
    <ScreenWrapper login={login}>
      <RequestOtpCode
        {...{ countryCode, mobileNumber }}
        loading={otpRequestStatus === "sending"}
        onCountryCodeChange={updateCountryCode}
        onMobileNumberChangeText={updateMobileNumber}
        onMobileNumberClear={clearMobileNumber}
        onRequestCodePress={handleOtpCodeRequest}
      />
    </ScreenWrapper>
  );
};

RequestOtpCodeScreen.screenName = SCREENS.REQUEST_CODE;
RequestOtpCodeScreen.options = {
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

export default RequestOtpCodeScreen;
