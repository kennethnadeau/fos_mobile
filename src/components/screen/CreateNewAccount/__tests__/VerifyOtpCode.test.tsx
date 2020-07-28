import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import VerifyOtpCode from '../VerifyOtpCode';
import enUS from '@fos/locale/languages/en-US';

const localization = enUS.translation.screens.createNewAccount;

describe('<VerifyOtpCode />', () => {
  let verifyOtpCode: RenderAPI;

  beforeEach(() => {
    verifyOtpCode = render(
      <VerifyOtpCode mobileNumber="123456789" onResendPress={jest.fn()} />,
    );
  });

  it('should have carousel item description', () => {
    const actual = verifyOtpCode.queryByA11yLabel(
      localization.verifyOtpCodeHeader,
    );

    expect(actual).not.toBeNull();
  });

  it('should show header', () => {
    const actual = verifyOtpCode.queryByText(localization.verifyOtpCodeHeader);

    expect(actual).not.toBeNull();
  });

  it('should show OTP code input', () => {
    const actual = verifyOtpCode.queryByA11yLabel(
      localization.verifyOtpCodeInput.otpCodeInput,
    );

    expect(actual).not.toBeNull();
    expect(actual?.children).toHaveLength(1);
  });

  it('should match snapshot', () => {
    expect(verifyOtpCode.toJSON()).toMatchSnapshot();
  });
});
