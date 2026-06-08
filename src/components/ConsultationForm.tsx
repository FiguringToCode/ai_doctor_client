import { useState } from 'react'
import { Stethoscope, Send, RotateCcw, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchConsultation, reset } from '../store/slices/consultationSlice'
import type { Gender } from '../types'

export function ConsultationForm() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((s) => s.consultation.status)

  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState<Gender>('unknown')

  const isLoading = status === 'loading'

  const handleSubmit = () => {
    if (!symptoms.trim()) return
    dispatch(fetchConsultation({ symptoms: symptoms.trim(), age: Number(age), gender }))
  }

  const handleReset = () => {
    dispatch(reset())
    setSymptoms('')
    setAge(0)
    setGender('unknown')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-border/50">
        <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <Stethoscope className="w-5 h-5 text-teal-400" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">Patient Intake</h2>
          <p className="text-xs text-muted-foreground font-body">Describe your symptoms for AI analysis</p>
        </div>
      </div>

      {/* Symptoms */}
      <div className="space-y-2">
        <Label htmlFor="symptoms" className="text-sm font-medium text-foreground/80">
          Symptoms <span className="text-teal-400">*</span>
        </Label>
        <Textarea
          id="symptoms"
          placeholder="Describe your symptoms in detail… e.g., I've had a throbbing headache for 2 days, accompanied by nausea and sensitivity to light."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="min-h-[120px] bg-background/50 border-border/60 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/50 placeholder:text-muted-foreground/50 text-sm leading-relaxed"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground/60 font-body">
          Be as specific as possible — duration, severity, related factors
        </p>
      </div>

      {/* Age + Gender row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium text-foreground/80">
            Age <span className="text-teal-400">*</span>
          </Label>
          <Input
            id="age"
            type="number"
            min={1}
            max={80}
            value={age}
            onChange={(e) => setAge(e.target.valueAsNumber)}
            className="bg-background/50 border-border/60 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/50"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground/80">Gender </Label>
          <Select
            value={gender}
            onValueChange={(v) => setGender(v as Gender)}
            disabled={isLoading}
          >
            <SelectTrigger className="bg-background/50 border-border/60 focus:ring-teal-500/50">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Prefer not to say</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="teal"
          size="lg"
          className="flex-1 font-body font-medium tracking-wide"
          onClick={handleSubmit}
          disabled={isLoading || !symptoms.trim() || !age || !gender}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analysing…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Get Consultation
            </>
          )}
        </Button>

        {status !== 'idle' && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            disabled={isLoading}
            className="border-border/60 hover:bg-accent/50"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Disclaimer banner */}
      <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-4 py-3">
        <p className="text-xs text-amber-400/80 font-body leading-relaxed">
          <span className="font-semibold text-amber-400">⚠ Not a substitute for medical advice.</span>{' '}
          This AI tool provides general health information only. Always consult a licensed medical professional for diagnosis and treatment.
        </p>
      </div>
    </div>
  )
}
