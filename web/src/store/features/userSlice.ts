import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  role: string;
}

const initialState: UserState = {
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

  },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
