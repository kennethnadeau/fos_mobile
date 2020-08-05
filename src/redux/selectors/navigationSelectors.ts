import { RootState } from "redux/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectNavigation = (state: RootState) => state.navigation;

export const selectPagination = createSelector(
  selectNavigation,
  ({ topBar }) => topBar.pagination,
);
