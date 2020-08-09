import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { apiService } from "@fos/shared";
import { Alert } from "@fos/components/Alert";
import {
  setShowSpinner,
  setShowResendAlert,
} from "@fos/redux/slices/flagsSlice";
import { setToastMessage } from "@fos/redux/slices/toastSlice";
import { selectResendAlert } from "@fos/redux/selectors/flagsSelector";
import { selectOtpState } from "redux/selectors/otpSelectors";

const { otp } = apiService;

type ResendCodeAlertContainerProps = {
  login: boolean;
};

// TODO: move this file
const ResendCodeAlertContainer: FC<ResendCodeAlertContainerProps> = ({
  login,
}) => {
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();
  const otpState = useSelector(selectOtpState);
  const showResendAlert = useSelector(selectResendAlert);

  const { countryCode, mobileNumber } = otpState;
  const formatPhoneNumber = useCallback(
    () => `${countryCode.replace("+", "")}${mobileNumber}`,
    [countryCode, mobileNumber],
  );

  // TODO: abstract this
  const sendOtpCode = useCallback(() => {
    const postRequestMethod = login
      ? otp.postOtpAuthenticate
      : otp.postOtpRegistration;

    return postRequestMethod({ phone: formatPhoneNumber() });
  }, [formatPhoneNumber, login]);

  const resendCodeAlertButtons = [
    {
      id: "no",
      title: t("NO"),
      onPress: () => dispatch(setShowResendAlert(false)),
    },
    {
      id: "yes",
      title: t("YES"),
      onPress: async () => {
        dispatch(setShowSpinner(true));
        dispatch(setShowResendAlert(false));

        try {
          await sendOtpCode();
          dispatch(setToastMessage(t("Code Resent")));
        } catch (e) {
          dispatch(setToastMessage(`${t("Code Resend Failed")}: ${e}`));
        } finally {
          dispatch(setShowSpinner(false));
        }
      },
    },
  ];

  return (
    <Alert
      body={t("Are you sure?")}
      buttons={resendCodeAlertButtons}
      header={t("Resend Code")}
      isVisible={showResendAlert}
    />
  );
};

export default ResendCodeAlertContainer;
