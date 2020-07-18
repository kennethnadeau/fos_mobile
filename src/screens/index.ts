import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LoginScreen from './Login';
import NavUx from './NavUx';
import SplashScreen from './SplashScreen';
import LandingScreen from './Landing';

registerScreens(
  [SplashScreen, NavUx, LandingScreen, LoginScreen],
  '',
  wrapWithRequiredProviders,
);
