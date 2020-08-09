import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScreenFC } from "react-native-navigation-register-screens";

import { setEmailAddress } from "redux/reducers/otpReducer";
import { selectOtpState } from "redux/selectors/otpSelectors";
import { goToEnterNameScreen } from "helpers/navigation";

import { SCREENS } from "@fos/constants";
import EnterEmailAddress from "@fos/components/Account/EnterEmailAddress";
import {
  setCurrentScreen,
  updatePaginationActiveDotIndex,
} from "redux/slices/navigationSlice";
import { getDotIndex, handleListener } from "../helpers";

const EnterEmailScreen: ScreenFC = ({ componentId }) => {
  const dispatch = useDispatch();
  const { emailAddress } = useSelector(selectOtpState);

  useLayoutEffect(() => {
    dispatch(setCurrentScreen(SCREENS.ENTER_EMAIL));
    const dotIndex = getDotIndex(SCREENS.ENTER_EMAIL);
    dispatch(updatePaginationActiveDotIndex(dotIndex));
    return handleListener({
      screenName: SCREENS.ENTER_EMAIL,
      componentId,
      dispatch,
    });
  }, [dispatch, componentId]);

  const emailAddressChange = (email: string) => {
    dispatch(setEmailAddress(email));
  };
  const clearEmailAddress = () => {
    dispatch(setEmailAddress(""));
  };

  return (
    <EnterEmailAddress
      emailAddress={emailAddress}
      onEmailAddressChangeText={emailAddressChange}
      onEmailClear={clearEmailAddress}
      onNextPress={() => goToEnterNameScreen(componentId)}
    />
  );
};

EnterEmailScreen.screenName = SCREENS.ENTER_EMAIL;

export default EnterEmailScreen;
