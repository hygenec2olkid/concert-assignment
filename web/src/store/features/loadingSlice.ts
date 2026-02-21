import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
    isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    onLoad: (state) => {
      state.isLoading = true;
    },
    offLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { onLoad, offLoad } = loadingSlice.actions;
export default loadingSlice.reducer;
