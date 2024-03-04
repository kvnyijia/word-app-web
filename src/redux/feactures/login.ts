import { createSlice } from "@reduxjs/toolkit";

type UserLoginState = {
  login: boolean;
};

const initialState = {
  login: false,
} as UserLoginState;

const userLoginSlice = createSlice({
  name: "userLoginSlice",
  initialState,
  reducers: {
    login(state) {
      state.login = true;
    },
    logout(state) {
      state.login = false;
    },
  },
});

const userLogin_reducer = userLoginSlice.reducer;

export const { login, logout } = userLoginSlice.actions;
export default userLogin_reducer;
