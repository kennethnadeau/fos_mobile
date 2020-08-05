import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import {render, RenderAPI} from 'react-native-testing-library';

describe('<WelcomeScreen />', () => {
  let welcomeScreen: RenderAPI;

  beforeEach(() => {
    welcomeScreen = render(
      <WelcomeScreen componentId="id" fullName="John Doe" />,
    );
  });

  it('should show welcome back text', () => {
    const actual = welcomeScreen.queryByText('Welcome Back');
    expect(actual).not.toBeNull();
  });
});
