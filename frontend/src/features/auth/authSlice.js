import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, registerUserThunk } from './authThunks';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearAuthError(state) {
      state.error = null;
    },
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.token) localStorage.setItem('token', action.payload.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUserThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem('token', a.payload.token);
      })
      .addCase(loginUserThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Login failed'; })

      .addCase(registerUserThunk.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUserThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem('token', a.payload.token);
      })
      .addCase(registerUserThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Register failed'; });
  }
});

export const { logout, clearAuthError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
