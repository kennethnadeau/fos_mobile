import React, { FC } from "react";
import { useDispatch, connect } from "react-redux";

import EnterEmailAddress from "@fos/components/Account/EnterEmailAddress";
import { setEmailAddress } from "redux/reducers/otpReducer";

type EnterEmailAddressContainerProps = {
  emailAddress: string;
  goToNextStep: () => void;
};

const EnterEmailAddressContainer: FC<EnterEmailAddressContainerProps> = (
  props,
) => {
  const { emailAddress, goToNextStep } = props;
  const dispatch = useDispatch();

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
      onNextPress={goToNextStep}
    />
  );
};

const mapStateToProps = (state: any) => ({
  emailAddress: state.otp.emailAddress,
});

export default connect(mapStateToProps)(EnterEmailAddressContainer);
