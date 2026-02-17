import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStatus {
  role: string;
}

const initialState: UserStatus = {
  role: "admin",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
