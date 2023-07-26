import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    signouted: false,
    token: undefined,
  },
  reducers: {
    signin(state) {
      state.isLoggedIn = true;
    },
    signout(state) {
      state.isLoggedIn = false;
    },
    reciveUser(state, action) {
      state.user = action.payload;
    },
    token(state, action) {
      state.token = action.payload;
    },
    available(state) {
      state.signouted = false;
    },
    notAvailable(state) {
      state.signouted = true;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
