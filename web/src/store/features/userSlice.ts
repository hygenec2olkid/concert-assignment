import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  role: string;
  isHydrated: boolean;
}

const initialState: UserState = {
  role: "",
  isHydrated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
  },
});

export const { setRole, setHydrated } = userSlice.actions;
export default userSlice.reducer;
