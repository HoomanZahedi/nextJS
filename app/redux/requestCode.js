import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  first: 0,
  last: 10,
};

export const paging = createSlice({
  initialState: initialState,
  name: "setPaging",
  reducers: {
    setPaging: (state) => {
      state.first = state.first + 10;
      state.last = state.last + 10;
    },
  },
});

export const { setPaging } = paging.actions;
export default paging.reducer;
