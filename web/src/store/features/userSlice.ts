import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  role: string;
  userId: number | undefined;
}

const initialState: UserState = {
  role: "",
  userId: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const { setRole, setUserId } = userSlice.actions;
export default userSlice.reducer;
