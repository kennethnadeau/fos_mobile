import { NavigationActions } from "react-navigation";

export interface navigator {
  dispatch: Function;
}

let _navigator: navigator;

function setTopLevelNavigator(navigatorRef: navigator) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: object) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
