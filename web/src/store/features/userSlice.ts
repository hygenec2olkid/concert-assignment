import { createSlice } from "@reduxjs/toolkit";

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
    set: (state) => {
      state.role = state.role;
    },
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
