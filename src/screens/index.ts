import registerScreens from 'react-native-navigation-register-screens';
import {wrapWithRequiredProviders} from '@fos/helpers/screens';
import LandingScreen from './Landing';
import CreateNewAccountScreen from './CreateNewAccount';
import CarouselPaginationContainer from '@fos/containers/navigation/topBar/CarouselPaginationContainer';
import QuestionMarkContainer from '@fos/containers/navigation/topBar/QuestionMarkContainer';
import {NavigationComponentProviders} from '@fos/containers/AppProviders';

// FIXME This is not an ideal solution because of the two separate registration statement
registerScreens(
  [CarouselPaginationContainer, QuestionMarkContainer],
  '',
  wrapWithRequiredProviders(NavigationComponentProviders),
);

registerScreens(
  [LandingScreen, CreateNewAccountScreen],
  '',
  wrapWithRequiredProviders(),
);
