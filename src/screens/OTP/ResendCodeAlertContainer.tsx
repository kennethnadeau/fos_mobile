import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Alert } from "@fos/components/Alert";
import { setToastMessage } from "@fos/redux/slices/toastSlice";

type ResendCodeAlertContainerProps = {
  sendOtpCode: () => void;
  showResendAlert: boolean;
  setShowResendAlert: (show: boolean) => void;
  setShowSpinner: (show: boolean) => void;
};

const ResendCodeAlertContainer: FC<ResendCodeAlertContainerProps> = (props) => {
  const {
    sendOtpCode,
    showResendAlert,
    setShowResendAlert,
    setShowSpinner,
  } = props;
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();

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
          dispatch(setToastMessage(t("Code Resent")));
        } catch {
          dispatch(setToastMessage(t("Code Resend Failed")));
        } finally {
          setShowSpinner(false);
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
