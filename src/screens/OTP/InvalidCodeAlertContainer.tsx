import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { vs } from "react-native-size-matters";

import { Alert } from "@fos/components/Alert";
import {
  setOtpCode,
  setOtpCodeVerificationStatus,
} from "redux/reducers/otpReducer";

type InvalidCodeAlertContainerProps = {
  showInvalidCodeAlert: boolean;
  setShowInvalidCodeAlert: (show: boolean) => void;
};

const InvalidCodeAlertContainer: FC<InvalidCodeAlertContainerProps> = (
  props,
) => {
  const { showInvalidCodeAlert, setShowInvalidCodeAlert } = props;
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();

  const invalidCodeAlertButtons = [
    {
      id: "try-again",
      title: t("Try Again"),
      onPress: () => {
        setShowInvalidCodeAlert(false);
        dispatch(setOtpCodeVerificationStatus("unverified"));
        dispatch(setOtpCode(""));
      },
    },
  ];

  return (
    <Alert
      buttons={invalidCodeAlertButtons}
      header={t("Invalid Code")}
      height={vs(120)}
      isVisible={showInvalidCodeAlert}
    />
  );
};

export default InvalidCodeAlertContainer;
