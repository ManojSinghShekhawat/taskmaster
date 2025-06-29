import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axiosInstance";
export const authStatus = createAsyncThunk("auth/authStatus", async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/authstatus");
    if (res.data.success === false) {
      return thunkAPI.rejectWithValue(res.data.message);
    }

    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Auth check failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authStatus.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(authStatus.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { loginSuccess, logout, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
