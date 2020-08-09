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
import { updatePaginationActiveDotIndex } from "redux/slices/navigationSlice";
import { getDotIndex } from "../helpers";

const { account } = apiService;

const EnterNameScreen: ScreenFC<any> = () => {
  const dispatch = useDispatch();
  const otpState = useSelector(selectOtpState);

  useLayoutEffect(() => {
    const dotIndex = getDotIndex(SCREENS.ENTER_NAME);
    dispatch(updatePaginationActiveDotIndex(dotIndex));
  }, [dispatch]);

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
      dispatch(setToastMessage("Whoops! Something went wrong."));
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
