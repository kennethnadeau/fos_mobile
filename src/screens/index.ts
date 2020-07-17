import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LoginScreen from './Login';
import NavUx from './NavUx';

registerScreens([NavUx, LoginScreen], '', wrapWithRequiredProviders);
