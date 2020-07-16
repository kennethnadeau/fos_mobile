import {NavigationActions, NavigationAction} from 'react-navigation';

export interface navigator {
  dispatch: (action: NavigationAction) => void;
}

let _navigator: navigator;

function setTopLevelNavigator(navigatorRef: navigator): void {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: any): void {
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
