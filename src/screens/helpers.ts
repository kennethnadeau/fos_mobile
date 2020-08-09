import { Dispatch } from "react";
import { Navigation } from "react-native-navigation";

import { apiService } from "@fos/shared";
import { updatePaginationActiveDotIndex } from "redux/slices/navigationSlice";
import { loginFlow, registerFlow } from "./constants";

const { otp } = apiService;

export const getDotIndex = (screenName: string, login: boolean = false) => {
  if (login) {
    return loginFlow.indexOf(screenName);
  }
  return registerFlow.indexOf(screenName);
};

type HandleListenerProps = {
  screenName: string;
  componentId: string;
  login: boolean;
  dispatch: Dispatch<any>;
};

export const handleListener = (props: HandleListenerProps) => {
  const { screenName, componentId, login, dispatch } = props;
  const listener = {
    componentDidAppear: () => {
      const dotIndex = getDotIndex(screenName, login);
      dispatch(updatePaginationActiveDotIndex(dotIndex));
    },
  };
  // Register the listener to all events related to our component
  const unsubscribe = Navigation.events().registerComponentListener(
    listener,
    componentId,
  );

  return () => {
    unsubscribe.remove();
  };
};

export const formatPhoneNumber = (countryCode: string, mobileNumber: string) =>
  `${countryCode.replace("+", "")}${mobileNumber}`;

export const sendOtpCode = (login: boolean, phone: string) => {
  const postRequestMethod = login
    ? otp.postOtpAuthenticate
    : otp.postOtpRegistration;

  return postRequestMethod({ phone });
};
