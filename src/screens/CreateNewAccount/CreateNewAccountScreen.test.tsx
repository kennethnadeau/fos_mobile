import React from 'react';
import CreateNewAccountScreen from './CreateNewAccountScreen';
import {render, RenderAPI} from '@fos/utils/testing';
import enUs from '@fos/locale/languages/en-US';

const localization = enUs.translation.screens.createNewAccount;

describe('<CreateNewAccountScreen />', () => {
  let createNewAccountScreen: RenderAPI;

  beforeEach(() => {
    createNewAccountScreen = render(
      <CreateNewAccountScreen componentId="id" />,
    );
  });

  it('should show request code slider item', () => {
    expect(
      createNewAccountScreen.queryByA11yLabel(
        localization.requestOtpCodeHeader,
      ),
    ).not.toBeNull();
  });

  it('should show verify code slider item', () => {
    expect(
      createNewAccountScreen.queryByA11yLabel(localization.verifyOtpCodeHeader),
    ).not.toBeNull();
  });

  it('should show email address slider item', () => {
    expect(
      createNewAccountScreen.queryByA11yLabel(
        localization.enterEmailAddressHeader,
      ),
    ).not.toBeNull();
  });

  it('should show new user slider item', () => {
    expect(
      createNewAccountScreen.queryAllByA11yLabel(localization.enterNameHeader),
    ).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(createNewAccountScreen.toJSON()).toMatchSnapshot();
  });
});
