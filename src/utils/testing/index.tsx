import React from "react";
import {
  render as rntlRender,
  RenderOptions,
} from "react-native-testing-library";
import AppProviders from "containers/AppProviders";
// import '@fos/locale/i18n';

export function Wrapper({ children }: { children: React.ReactElement<any> }) {
  return <AppProviders testing>{children}</AppProviders>;
}

export function render(
  component: React.ReactElement<any>,
  options?: RenderOptions,
) {
  return rntlRender(component, {
    wrapper: Wrapper,
    ...options,
  });
}

export * from "react-native-testing-library";
