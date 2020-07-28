import React from 'react';
import RequestOtpCode, {RequestCodeProps} from '../RequestOtpCode';
import {render, RenderAPI} from '@fos/utils/testing';
import enUS from '@fos/locale/languages/en-US';

const localization = enUS.translation.screens.createNewAccount;

describe('<RequestOtpCode />', () => {
  const props: RequestCodeProps = {
    onRequestCodePress: jest.fn(),
    countryCode: '',
    mobileNumber: '',
    onCountryCodeChange: jest.fn(),
    onMobileNumberChangeText: jest.fn(),
    onMobileNumberClear: jest.fn(),
  };

  let requestCodeComponent: RenderAPI;

  beforeEach(() => {
    requestCodeComponent = render(<RequestOtpCode {...props} />);
  });

  it('should have carousel item description', () => {
    const actual = requestCodeComponent.queryByA11yLabel(
      localization.requestOtpCodeHeader,
    );

    expect(actual).not.toBeNull();
  });

  it('should show header', () => {
    const actual = requestCodeComponent.queryByText(
      localization.requestOtpCodeHeader,
    );
    expect(actual).not.toBeNull();
  });

  it('should show country code input', () => {
    const actual = requestCodeComponent.queryByA11yLabel(
      localization.requestOtpCodeInput.countryCode,
    );

    expect(actual).not.toBeNull();
  });

  it('should show mobile number input', () => {
    const actual = requestCodeComponent.queryByPlaceholder(
      localization.requestOtpCodeInput.mobileNumber,
    );

    expect(actual).not.toBeNull();
  });

  it('should show request code button', () => {
    const actual = requestCodeComponent.queryByA11yLabel(
      localization.requestOtpCodeButton.requestCode,
    );
    expect(actual).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(requestCodeComponent.toJSON()).toMatchSnapshot();
  });
});
