import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import QuestionMarkContainer from '../QuestionMarkContainer';

describe('<QuestionMarkContainer />', () => {
  let questionMarkContainer: RenderAPI;

  beforeEach(() => {
    questionMarkContainer = render(<QuestionMarkContainer componentId="id" />);
  });

  it('should match snapshot', () =>
    expect(questionMarkContainer.toJSON()).toMatchSnapshot());
});
