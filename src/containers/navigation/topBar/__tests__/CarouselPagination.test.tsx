import React from 'react';
import {render, RenderAPI} from '@fos/utils/testing';
import CarouselPagination from '../CarouselPagination';
import enUs from '@fos/locale/languages/en-US';

const localization = enUs.translation.navigation;

describe('<CarouselPagination />', () => {
  let carouselPagination: RenderAPI;

  beforeEach(() => {
    carouselPagination = render(<CarouselPagination componentId="id" />);
  });

  it('should show carousel pagination', () => {
    const actual = carouselPagination.getByA11yLabel(
      localization.component.carouselPagination,
    );

    expect(actual).not.toBeNull();
    expect(actual.children).toHaveLength(1);
  });

  it('should match snapshot', () =>
    expect(carouselPagination.toJSON()).toMatchSnapshot());
});
