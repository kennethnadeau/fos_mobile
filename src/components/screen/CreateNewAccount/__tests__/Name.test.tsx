import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import Name, {NameProps} from '../Name';

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
    const actual = name.queryByText('Enter Name');

    expect(actual).not.toBeNull();
  });

  it('should show first name input', () => {
    const actual = name.queryByA11yLabel('First Name');

    const placeholder = name.queryByPlaceholder('First Name');

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show last name input', () => {
    const actual = name.queryByA11yLabel('Last Name');

    const placeholder = name.queryByPlaceholder('Last Name');

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it('should show create user button', () => {
    const actual = name.queryByA11yLabel('Create User');

    expect(actual).not.toBeNull();
  });

  it('should show footer', () => {
    const actual = name.queryByText('Enter name footer text');

    expect(actual).not.toBeNull();
  });

  it('should match snapshot', () => {
    expect(name.toJSON()).toMatchSnapshot();
  });
});
