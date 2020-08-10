import requestOtpCode from "./requestOtpCode.json";
import verifyOtpCode from "./verifyOtpCode.json";
import enterEmailAddress from "./enterEmailAddress.json";
import enterName from "./enterName.json";

export default {
  ...requestOtpCode,
  ...verifyOtpCode,
  ...enterEmailAddress,
  ...enterName,
};
