import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: (() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const token = localStorage.getItem("token") === "undefined" ? null : localStorage.getItem("token") || null;
    
    const cartKey = user?.id ? `cart_${user.id}` : "cart";
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    return {
      user,
      token,
      searchQuery: localStorage.getItem("searchQuery") || "",
      searchResults: [],
      selectedLocationId: null,
      cart,
    };
  })(),
  reducers: {
    setCredentials: (state, { payload }) => {
      const { user } = payload;
      const token = payload.token || user.accessToken;
      state.user = user;
      state.token = token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const userCartKey = `cart_${user.id}`;
      const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
      state.cart = savedCart;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.searchQuery = "";
      state.cart = [];
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("cart");
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
      localStorage.setItem("searchQuery", payload);
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSelectedLocationId: (state, action) => {
      state.selectedLocationId = action.payload;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocationId = null;
    },
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
      const key = state.user?.id ? `cart_${state.user.id}` : "cart";
      localStorage.setItem(key, JSON.stringify(state.cart));
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(item => item.id !== payload);
      const key = state.user?.id ? `cart_${state.user.id}` : "cart";
      localStorage.setItem(key, JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      const key = state.user?.id ? `cart_${state.user.id}` : "cart";
      localStorage.removeItem(key);
    }
  },
});

export const { 
  setCredentials,
  logout,
  setSearchQuery,
  setSearchResults, 
  setSelectedLocationId,
  clearSelectedLocation,
  addToCart,
  removeFromCart,
  clearCart,
} = authSlice.actions;
export default authSlice.reducer;