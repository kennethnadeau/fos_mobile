import { SCREENS } from "@fos/constants";

export const loginFlow = [SCREENS.REQUEST_CODE, SCREENS.VERIFY_CODE];

export const registerFlow = [
  SCREENS.REQUEST_CODE,
  SCREENS.VERIFY_CODE,
  SCREENS.ENTER_EMAIL,
  SCREENS.ENTER_NAME,
];
