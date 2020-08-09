import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { vs } from "react-native-size-matters";

import { Alert } from "@fos/components/Alert";
import {
  setOtpCode,
  setOtpCodeVerificationStatus,
} from "redux/reducers/otpReducer";
import { setShowInvalidCodeAlert } from "@fos/redux/slices/flagsSlice";
import { selectInvalidCodeAlert } from "redux/selectors/flagsSelector";

// TODO: move this file
const InvalidCodeAlertContainer: FC = () => {
  const { t } = useTranslation("screens");
  const dispatch = useDispatch();
  const showInvalidCodeAlert = useSelector(selectInvalidCodeAlert);

  const invalidCodeAlertButtons = [
    {
      id: "try-again",
      title: t("Try Again"),
      onPress: () => {
        dispatch(setShowInvalidCodeAlert(false));
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
