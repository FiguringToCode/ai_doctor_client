import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { consultationAPI } from '../../lib/axios.lib'
import type { ConsultationRequest, ConsultationResult, ConsultationState, HistoryEntry } from '../../types'

export const fetchConsultation = createAsyncThunk<
  ConsultationResult,
  ConsultationRequest,
  { rejectValue: string }
>('consultation/fetch', async ({ symptoms, age, gender }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      age: String(age),
      gender,
    })
    
    // Handle symptoms array properly
    if (Array.isArray(symptoms)) {
      symptoms.forEach(symptom => params.append('symptoms', symptom))
    } else {
      params.append('symptoms', symptoms as string)
    }
    
    const res = await consultationAPI.consult(params.toString())
    
    if (res.status !== 200) {
      return rejectWithValue(`Server error ${res.status}`)
    }
    
    return res.data
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(err.response.data?.error || `Server error ${err.response.status}`)
    }
    return rejectWithValue(err.message || 'Network error')
  }
})

const initialState: ConsultationState = {
  status: 'idle',
  result: null,
  error: null,
  request: null,
  history: [],
}

const consultationSlice = createSlice({
  name: 'consultation',
  initialState,
  reducers: {
    reset(state) {
      state.status = 'idle'
      state.result = null
      state.error = null
      state.request = null
    },
    clearHistory(state) {
      state.history = []
    },
    removeHistoryEntry(state, action: { payload: string }) {
      state.history = state.history.filter((h) => h.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultation.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.result = null
        state.request = action.meta.arg
      })
      .addCase(fetchConsultation.fulfilled, (state, action) => {
        state.status = 'success'
        state.result = action.payload
        const entry: HistoryEntry = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          request: action.meta.arg,
          result: action.payload,
        }
        state.history.unshift(entry)
        if (state.history.length > 10) state.history.pop()
      })
      .addCase(fetchConsultation.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? 'Unknown error'
      })
  },
})

export const { reset, clearHistory, removeHistoryEntry } = consultationSlice.actions
export default consultationSlice.reducer
