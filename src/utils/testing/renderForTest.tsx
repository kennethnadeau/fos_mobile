import React from 'react';
import {render, RenderOptions} from 'react-native-testing-library';
import {I18nextProvider} from 'react-i18next';
import i18n from '@fos/locale/i18n';

function renderForTest(
  component: React.ReactElement<any>,
  options?: RenderOptions,
) {
  return render(
    <I18nextProvider i18n={i18n}>{component}</I18nextProvider>,
    options,
  );
}

export default renderForTest;
