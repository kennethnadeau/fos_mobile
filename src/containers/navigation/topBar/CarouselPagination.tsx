import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {Pagination} from 'react-native-snap-carousel';
import {SCREENS} from '@fos/constants';
import {Colors} from '@fos/themes';
import {useSelector} from 'react-redux';
import {selectPagination} from '@fos/redux/selectors/navigationSelectors';
import {useTranslation} from 'react-i18next';

const CarouselPagination: ScreenFC = () => {
  const {t} = useTranslation();
  const pagination = useSelector(selectPagination);

  return (
    <View
      accessibilityLabel={t('navigation.component.carouselPagination')}
      accessible>
      <Pagination
        {...pagination}
        containerStyle={styles.paginationContainer}
        dotColor={Colors.white}
        inactiveDotColor={Colors.muted}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

CarouselPagination.screenName = SCREENS.COMPONENTS.TOP_BAR.PAGINATION;

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 0,
  },
});

export default CarouselPagination;
