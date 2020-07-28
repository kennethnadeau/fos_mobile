import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LandingScreen from './Landing';
import CreateNewAccountScreen from './CreateNewAccount';
import CarouselPagination from '@fos/containers/navigation/topBar/CarouselPagination';
import {NavigationComponentProviders} from '@fos/containers/AppProviders';

// FIXME This is not an ideal solution because of the two separate registration statement
registerScreens(
  [CarouselPagination],
  '',
  wrapWithRequiredProviders(NavigationComponentProviders),
);

registerScreens(
  [LandingScreen, CreateNewAccountScreen],
  '',
  wrapWithRequiredProviders(),
);
