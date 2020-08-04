import ENV from 'react-native-config';

export const apiConfig = {
  baseUrl: ENV.API_URL,
  flurryApiKey: ENV.FLURRY_API_KEY
};
