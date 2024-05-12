import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const initialState = {
  status: false,
  userInfo: null,
};

const cookie = Cookie.get("user_info");

if (cookie) {
  const data = JSON.parse(cookie);
  initialState.status = data?.status;
  initialState.userInfo = data?.userInfo;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userInfo = action.payload;
      Cookie.set(
        "user_info",
        JSON.stringify({ status: true, userInfo: action.payload }),
        {
          expires: 1,
        }
      );
    },
    logout: (state) => {
      state.status = false;
      state.userInfo = null;
      Cookie.set(
        "user_info",
        JSON.stringify({ status: false, userInfo: null }),
        {
          expires: 1,
        }
      );
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
