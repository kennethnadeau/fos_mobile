import registerScreens from "react-native-navigation-register-screens";
import { wrapWithRequiredProviders } from "@fos/helpers/screens";
import LandingScreen from "./Landing";
import RequestOptCodeScreen from "./RequestOtpCode";
import VerifyOptCodeScreen from "./VerifyOptCode";
import CarouselPaginationContainer from "containers/CarouselPaginationContainer";
import QuestionMarkContainer from "@fos/containers/QuestionMarkContainer";
import BackButtonContainer from "@fos/containers/BackButtonContainer";
import { NavigationComponentProviders } from "@fos/containers/AppProviders";
import WelcomeScreen from "./Welcome";
import EnterEmailScreen from "./EnterEmail";
import EnterNameScreen from "./EnterName";

// FIXME This is not an ideal solution because of the two separate registration statement
registerScreens(
  [BackButtonContainer, CarouselPaginationContainer, QuestionMarkContainer],
  "",
  wrapWithRequiredProviders(NavigationComponentProviders),
);

registerScreens(
  [
    LandingScreen,
    RequestOptCodeScreen,
    VerifyOptCodeScreen,
    EnterEmailScreen,
    EnterNameScreen,
    WelcomeScreen,
  ],
  "",
  wrapWithRequiredProviders(),
);
