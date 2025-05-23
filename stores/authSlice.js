import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { id, name, email, token }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUserName: (state, action) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    updateUserToken: (state, action) => {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateUserName, updateUserToken } = authSlice.actions;
export default authSlice.reducer;
