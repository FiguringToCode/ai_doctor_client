import { createSlice } from '@reduxjs/toolkit'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
}

const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
const prefersDark =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : true

const initialTheme: Theme =
  stored === 'dark' || stored === 'light' ? (stored as Theme) : prefersDark ? 'dark' : 'light'

const initialState: ThemeState = { theme: initialTheme }

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.theme)
    },
    setTheme(state, action: { payload: Theme }) {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer