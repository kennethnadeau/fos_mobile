import React from 'react';
import NavUxScreen from './NavUxScreen';
import {render, RenderAPI} from '@fos/utils/testing';

describe('<NavUxScreen />', () => {
  let rendered: RenderAPI;

  beforeEach(() => {
    rendered = render(<NavUxScreen componentId="id" />);
  });

  it('should show logo at the top', () => {
    const actual = rendered.getByA11yLabel('App logo');

    expect(actual).toBeDefined();
  });

  it('should show header title', () => {
    const actual = rendered.queryByText('Select Your Experience');

    expect(actual).toBeDefined();
  });

  it('should show Launch App button', () => {
    const actual = rendered.getByA11yLabel('Launch App');

    expect(actual).toBeDefined();
  });

  it('should show New Subscriptions button', () => {
    const actual = rendered.getByA11yLabel('New Subscriptions');

    expect(actual).toBeDefined();
  });

  it('should show Join Team Invite button', () => {
    const actual = rendered.getByA11yLabel('Join Team Invite');

    expect(actual).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
