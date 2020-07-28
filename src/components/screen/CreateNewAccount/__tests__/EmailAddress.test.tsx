import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import EmailAddress, {EmailAddressProps} from '../EmailAddress';
import enUs from '@fos/locale/languages/en-US';

const localization = enUs.translation.screens.createNewAccount;

describe('<EmailAddress />', () => {
  let emailAddress: RenderAPI;
  const props: EmailAddressProps = {
    onEmailClear: jest.fn(),
    emailAddress: 'foo@example.com',
    onNextPress: jest.fn(),
    onEmailAddressChangeText: jest.fn(),
  };

  beforeEach(() => {
    emailAddress = render(<EmailAddress {...props} />);
  });

  it('should show header', () => {
    const actual = emailAddress.queryByText(
      localization.enterEmailAddressHeader,
    );

    expect(actual).not.toBeNull();
  });

  it('should show input', () => {
    const actual = emailAddress.queryByA11yLabel(
      localization.emailAddressInput,
    );

    const placeholder = emailAddress.queryByPlaceholder(
      localization.emailAddressInput,
    );

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show next button', () => {
    const actual = emailAddress.queryByA11yLabel(
      localization.enterEmailAddressButton.next,
    );

    expect(actual).not.toBeNull();
  });

  it('should show footer', () => {
    const actual = emailAddress.queryByText(
      localization.enterEmailAddressFooter,
    );

    expect(actual).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(emailAddress.toJSON()).toMatchSnapshot();
  });
});
