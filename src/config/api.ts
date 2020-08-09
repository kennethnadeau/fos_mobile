import ENV from "react-native-config";

export const apiConfig = {
  baseUrl: ENV.API_URL,
};

export const FLURRY_API_KEY = ENV.FLURRY_API_KEY;
export const API_ERRORS_PRESENTED = ENV.API_ERRORS_PRESENTED;
