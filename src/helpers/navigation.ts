import { Navigation, Options } from "react-native-navigation";
import { SCREENS } from "@fos/constants";

const commonOptions: Partial<Options> = {
  topBar: {
    visible: true,
    title: {
      component: {
        name: SCREENS.COMPONENTS.TOP_BAR.PAGINATION,
      },
    },
  },
};

export function goToOTPScreen(componentId: string, login = false) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.OTP,
      options: commonOptions,
      passProps: {
        login,
        componentId,
      },
    },
  });
}

export function goToRequestScreen(componentId: string, login = false) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.REQUEST_CODE,
      options: commonOptions,
      passProps: {
        login,
        componentId,
      },
    },
  });
}

export function goToVerifyScreen(componentId: string, login = false) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.VERIFY_CODE,
      options: commonOptions,
      passProps: {
        login,
        componentId,
      },
    },
  });
}

export function goToEnterEmailScreen(componentId: string) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.ENTER_EMAIL,
      options: commonOptions,
      passProps: {
        componentId,
      },
    },
  });
}

export function goToEnterNameScreen(componentId: string) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.ENTER_NAME,
      options: commonOptions,
      passProps: {
        componentId,
      },
    },
  });
}

export function goToWelcomeScreen(fullName: string) {
  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.WELCOME,
        passProps: {
          fullName,
        },
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
}
