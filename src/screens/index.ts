import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LoginScreen from './Login';
import SplashScreen from './SplashScreen';
import LandingScreen from './Landing';

registerScreens(
  [SplashScreen, LandingScreen, LoginScreen],
  '',
  wrapWithRequiredProviders,
);
