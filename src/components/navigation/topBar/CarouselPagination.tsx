import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';
import {Colors} from '@fos/themes';
import {useTranslation} from 'react-i18next';

type CarouselPaginationProps = {
  dotsLength: number;
  activeDotIndex: number;
};

export const CarouselPagination: FC<CarouselPaginationProps> = (props) => {
  const {t} = useTranslation();

  return (
    <View accessibilityLabel={t('Carousel Pagination')} accessible>
      <Pagination
        {...props}
        containerStyle={styles.paginationContainer}
        dotColor={Colors.white}
        inactiveDotColor={Colors.muted}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 0,
  },
});
