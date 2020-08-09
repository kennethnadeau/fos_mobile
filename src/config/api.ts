import ENV from "react-native-config";

export const apiConfig = {
  baseUrl: ENV.API_URL,
};

export const FLURRY_API_KEY = ENV.FLURRY_API_KEY;
export const SHOULD_SHOW_API_ERRORS_RAW = ENV.SHOULD_SHOW_API_ERRORS_RAW;
