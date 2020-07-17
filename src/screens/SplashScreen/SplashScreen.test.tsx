import React from 'react';
import SplashScreen from './SplashScreen';
import {render, RenderAPI} from 'react-native-testing-library';

describe('<SplashScreen />', () => {
  let rendered: RenderAPI;

  beforeEach(() => {
    rendered = render(<SplashScreen componentId="id" />);
  });

  it('should show logo at the top', () => {
    const actual = rendered.getByA11yLabel('App logo');

    expect(actual).toBeDefined();
  });
  it('should match snapshot', () => {
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
