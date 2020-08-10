import React from "react";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SCREENS } from "@fos/constants";
import { useSelector } from "react-redux";
import { selectPagination } from "@fos/redux/selectors/navigationSelectors";
import { DotPagination } from "components/DotPagination";

const DotPaginationContainer: ScreenFC = () => {
  const pagination = useSelector(selectPagination);

  return <DotPagination {...pagination} />;
};

// TODO: make this more generic
DotPaginationContainer.screenName = SCREENS.COMPONENTS.TOP_BAR.PAGINATION;

export default DotPaginationContainer;
