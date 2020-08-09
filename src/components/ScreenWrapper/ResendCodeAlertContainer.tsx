import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "@fos/components/Alert";
import {
  setShowSpinner,
  setShowResendAlert,
} from "@fos/redux/slices/flagsSlice";
import { setToastMessage } from "@fos/redux/slices/toastSlice";
import { selectResendAlert } from "@fos/redux/selectors/flagsSelector";
import { selectOtpState } from "@fos/redux/selectors/otpSelectors";
import { formatPhoneNumber, sendOtpCode } from "@fos/screens/helpers";

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
          const formattedNumber = formatPhoneNumber(countryCode, mobileNumber);
          await sendOtpCode(login, formattedNumber);
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
