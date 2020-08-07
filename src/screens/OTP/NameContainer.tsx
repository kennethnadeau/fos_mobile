import React, { FC, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { apiService } from "@fos/shared";
import { setToastMessage } from "@fos/redux/slices/toastSlice";

import Name from "@fos/components/Account/EnterName";
import { goToWelcomeScreen } from "helpers/navigation";

const { account } = apiService;

type NameContainerProps = {
  otp: {
    emailAddress: string;
    mobileNumber: string;
    registrationUuid: string;
  };
  formatPhoneNumber: () => string;
  setShowSpinner: (show: boolean) => void;
};

const NameContainer: FC<NameContainerProps> = (props) => {
  const { otp, formatPhoneNumber, setShowSpinner } = props;
  const dispatch = useDispatch();

  const { emailAddress, registrationUuid } = otp;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const clearFirstName = () => setFirstName("");
  const clearLastName = () => setLastName("");

  const handleOnCreateUserPress = async () => {
    setShowSpinner(true);
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
      setShowSpinner(false);
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

const mapStateToProps = (state: any) => ({
  otp: state.otp,
});

export default connect(mapStateToProps)(NameContainer);
