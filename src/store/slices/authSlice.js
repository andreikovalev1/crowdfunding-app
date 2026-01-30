import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") === "undefined" ? null : localStorage.getItem("token") || null,
    searchQuery: localStorage.getItem("searchQuery") || "",
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      const { user } = payload;
      const token = payload.token || user.accessToken;

      state.user = user;
      state.token = token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("searchQuery");
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
      localStorage.setItem("searchQuery", payload);
    },
  },
});

export const { setCredentials, logout, setSearchQuery } = authSlice.actions;
export default authSlice.reducer;