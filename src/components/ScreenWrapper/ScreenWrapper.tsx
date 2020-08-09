import React, { FC, useLayoutEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Toast } from "@fos/components/Toast";
import { setPaginationDotsLength } from "@fos/redux/slices/navigationSlice";
import { selectToastMessage } from "redux/selectors/toastSelectors";
import InvalidCodeAlertContainer from "./InvalidCodeAlertContainer";
import ResendCodeAlertContainer from "./ResendCodeAlertContainer";
import { selectSpinnerVisible } from "redux/selectors/flagsSelector";

type ScreenWrapperProps = {
  login: boolean;
};

export const ScreenWrapper: FC<ScreenWrapperProps> = ({ children, login }) => {
  const dispatch = useDispatch();
  const toastMessage = useSelector(selectToastMessage);
  const showSpinner = useSelector(selectSpinnerVisible);

  useLayoutEffect(() => {
    dispatch(setPaginationDotsLength(login ? 2 : 4));
  }, [dispatch, login]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {children}
      <Overlay isVisible={showSpinner}>
        <ActivityIndicator />
      </Overlay>
      <Toast toastMessage={toastMessage} />
      <ResendCodeAlertContainer login={login} />
      <InvalidCodeAlertContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
