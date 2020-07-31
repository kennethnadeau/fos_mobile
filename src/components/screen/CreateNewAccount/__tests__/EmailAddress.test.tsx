import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import EmailAddress, {EmailAddressProps} from '../EmailAddress';

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
    const actual = emailAddress.queryByText('Enter Email Address');

    expect(actual).not.toBeNull();
  });

  it('should show input', () => {
    const actual = emailAddress.queryByA11yLabel('Your Email');

    const placeholder = emailAddress.queryByPlaceholder('Your Email');

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show next button', () => {
    const actual = emailAddress.queryByA11yLabel('Next');

    expect(actual).not.toBeNull();
  });

  it('should show footer', () => {
    const actual = emailAddress.queryByText('Email Usage');

    expect(actual).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(emailAddress.toJSON()).toMatchSnapshot();
  });
});
