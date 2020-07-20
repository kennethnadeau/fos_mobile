import React from 'react';
import {
  render as rntlRender,
  RenderOptions,
} from 'react-native-testing-library';
import {I18nextProvider} from 'react-i18next';
import i18n from '@fos/locale/i18n';
// import AppProviders from 'containers/AppProviders';

export function Wrapper({children}: {children: React.ReactElement<any>}) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
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

export * from 'react-native-testing-library';
