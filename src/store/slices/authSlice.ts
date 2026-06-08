import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authServerAxios, authAPI } from '../../lib/axios.lib'

export interface User {
  email: string
  userId: string
  name: string
  picture: string
}

interface AuthState {
  user: User | null
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  error: string | null
}

/** Check if the user already has a valid session (cookie-based JWT) */
export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authServerAxios.get<{ user: User }>('/user/profile')
      return res.data.user
    } catch {
      return rejectWithValue('Not authenticated')
    }
  }
)

/** Logout and clear the JWT cookie */
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout()
    } catch {
      return rejectWithValue('Logout failed')
    }
  }
)

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = 'unauthenticated'
        state.user = null
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated'
        state.user = null
      })
  },
})

export default authSlice.reducer
