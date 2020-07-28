import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  topBar: {
    pagination: {
      dotsLength: 4,
      activeDotIndex: 0,
    },
  },
};

const {actions, reducer} = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    updateActiveDotIndex(state, {payload}: PayloadAction<number>) {
      state.topBar.pagination.activeDotIndex = payload;
    },
  },
});

export const {updateActiveDotIndex} = actions;

export default reducer;
