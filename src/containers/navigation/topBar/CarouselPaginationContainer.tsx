import React from "react";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SCREENS } from "@fos/constants";
import { useSelector } from "react-redux";
import { selectPagination } from "@fos/redux/selectors/navigationSelectors";
import { CarouselPagination } from "@fos/components/navigation/topBar";

const CarouselPaginationContainer: ScreenFC = () => {
  const pagination = useSelector(selectPagination);

  return <CarouselPagination {...pagination} />;
};

CarouselPaginationContainer.screenName = SCREENS.COMPONENTS.TOP_BAR.PAGINATION;

export default CarouselPaginationContainer;
