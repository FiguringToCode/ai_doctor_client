export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency'
export type Likelihood = 'low' | 'medium' | 'high'
export type Gender = 'male' | 'female' | 'other' | 'unknown'

export interface PossibleCondition {
  name: string
  likelihood: Likelihood
  key_symptoms: string[]
}

export interface ConsultationResult {
  symptom_summary: string
  possible_conditions: PossibleCondition[]
  recommended_actions: string[]
  urgency_level: UrgencyLevel
  urgent_symptoms: string[]
  follow_up_questions: string[]
  disclaimer: string
}

export interface ConsultationRequest {
  symptoms: string
  age: number
  gender: Gender
}

export interface ConsultationState {
  status: 'idle' | 'loading' | 'success' | 'error'
  result: ConsultationResult | null
  error: string | null
  request: ConsultationRequest | null
  history: HistoryEntry[]
}

export interface HistoryEntry {
  id: string
  timestamp: number
  request: ConsultationRequest
  result: ConsultationResult
}
