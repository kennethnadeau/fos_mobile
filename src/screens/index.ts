import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LandingScreen from './Landing';

registerScreens([LandingScreen], '', wrapWithRequiredProviders);
