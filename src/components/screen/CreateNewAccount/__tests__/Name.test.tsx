import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import Name, {NameProps} from '../Name';
import enUs from '@fos/locale/languages/en-US';

const localization = enUs.translation.screens.createNewAccount;

describe('<Name />', () => {
  let name: RenderAPI;
  const props: NameProps = {
    onFirstNameClear: jest.fn(),
    onLastNameClear: jest.fn(),
    firstName: 'John',
    lastName: 'Doe',
    onCreateUserPress: jest.fn(),
    onFirstNameChangeText: jest.fn(),
    onLastNameChangeText: jest.fn(),
  };

  beforeEach(() => {
    name = render(<Name {...props} />);
  });

  it('should show header', () => {
    const actual = name.queryByText(localization.enterNameHeader);

    expect(actual).not.toBeNull();
  });

  it('should show first name input', () => {
    const actual = name.queryByA11yLabel(localization.firstNameInput);

    const placeholder = name.queryByPlaceholder(localization.firstNameInput);

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show last name input', () => {
    const actual = name.queryByA11yLabel(localization.lastNameInput);

    const placeholder = name.queryByPlaceholder(localization.lastNameInput);

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show create user button', () => {
    const actual = name.queryByA11yLabel(
      localization.enterNameButton.createUser,
    );

    expect(actual).not.toBeNull();
  });

  it('should show footer', () => {
    const actual = name.queryByText(localization.enterNameFooter);

    expect(actual).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(name.toJSON()).toMatchSnapshot();
  });
});
