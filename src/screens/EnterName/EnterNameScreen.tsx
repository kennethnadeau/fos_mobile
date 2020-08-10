import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiService } from "@fos/shared";
import { setToastMessage } from "@fos/redux/slices/toastSlice";

import Name from "@fos/components/Account/EnterName";
import { goToWelcomeScreen } from "helpers/navigation";
import { SCREENS } from "@fos/constants";
import { ScreenFC } from "react-native-navigation-register-screens";
import { selectOtpState } from "redux/selectors/otpSelectors";
import { setShowSpinner } from "redux/slices/flagsSlice";
import {
  setCurrentScreen,
  updatePaginationActiveDotIndex,
} from "redux/slices/navigationSlice";
import { API_ERRORS_PRESENTED } from "config/api";
import { getDotIndex, handleListener } from "../helpers";

const { account } = apiService;

const EnterNameScreen: ScreenFC<any> = (props) => {
  const { componentId } = props;
  const dispatch = useDispatch();
  const otpState = useSelector(selectOtpState);

  useLayoutEffect(() => {
    dispatch(setCurrentScreen(SCREENS.ENTER_NAME));
    const dotIndex = getDotIndex(SCREENS.ENTER_NAME);
    dispatch(updatePaginationActiveDotIndex(dotIndex));
    return handleListener({
      screenName: SCREENS.ENTER_NAME,
      componentId,
      dispatch,
    });
  }, [dispatch, componentId]);

  const {
    countryCode,
    emailAddress,
    mobileNumber,
    registrationUuid,
  } = otpState;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const clearFirstName = () => setFirstName("");
  const clearLastName = () => setLastName("");

  // TODO: abstract this
  const formatPhoneNumber = useCallback(
    () => `${countryCode.replace("+", "")}${mobileNumber}`,
    [countryCode, mobileNumber],
  );

  const handleOnCreateUserPress = async () => {
    dispatch(setShowSpinner(true));
    try {
      await account.postAccountRegistration({
        email: emailAddress,
        firstName,
        lastName,
        phone: formatPhoneNumber(),
        registrationUuid,
      });
      goToWelcomeScreen(`${firstName} ${lastName}`);
    } catch (e) {
      const message = API_ERRORS_PRESENTED
        ? e
        : "Whoops! Something went wrong!";
      dispatch(setToastMessage(message));
    } finally {
      dispatch(setShowSpinner(false));
    }
  };

  return (
    <Name
      {...{ firstName, lastName }}
      onCreateUserPress={handleOnCreateUserPress}
      onFirstNameChangeText={setFirstName}
      onFirstNameClear={clearFirstName}
      onLastNameChangeText={setLastName}
      onLastNameClear={clearLastName}
    />
  );
};

EnterNameScreen.screenName = SCREENS.ENTER_NAME;

export default EnterNameScreen;
