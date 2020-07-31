import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  topBar: {
    pagination: {
      dotsLength: 0,
      activeDotIndex: 0,
    },
  },
};

const {actions, reducer} = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPaginationDotsLength(state, {payload}: PayloadAction<number>) {
      state.topBar.pagination.dotsLength = payload;
    },
    updatePaginationActiveDotIndex(state, {payload}: PayloadAction<number>) {
      state.topBar.pagination.activeDotIndex = payload;
    },
  },
});

export const {
  setPaginationDotsLength,
  updatePaginationActiveDotIndex,
} = actions;

export default reducer;
