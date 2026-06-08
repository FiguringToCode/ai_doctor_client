import { configureStore } from '@reduxjs/toolkit'
import consultationReducer from './slices/consultationSlice'
import themeReducer from './slices/themeSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    consultation: consultationReducer,
    theme: themeReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
