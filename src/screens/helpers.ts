import { loginFlow, registerFlow } from "./constants";

export const getDotIndex = (screenName: string, login: boolean = false) => {
  if (login) {
    return loginFlow.indexOf(screenName);
  }
  return registerFlow.indexOf(screenName);
};
