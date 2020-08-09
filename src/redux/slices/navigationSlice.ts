import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  topBar: {
    pagination: {
      dotsLength: 0,
      activeDotIndex: 0,
      currentScreen: "",
    },
  },
};

const { actions, reducer } = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentScreen(state, { payload }: PayloadAction<string>) {
      state.topBar.pagination.currentScreen = payload;
    },
    setPaginationDotsLength(state, { payload }: PayloadAction<number>) {
      state.topBar.pagination.dotsLength = payload;
    },
    updatePaginationActiveDotIndex(state, { payload }: PayloadAction<number>) {
      state.topBar.pagination.activeDotIndex = payload;
    },
  },
});

export const {
  setCurrentScreen,
  setPaginationDotsLength,
  updatePaginationActiveDotIndex,
} = actions;

export default reducer;
