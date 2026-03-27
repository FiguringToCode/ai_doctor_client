import { useEffect, useRef } from 'react'
import {
  Activity,
  ClipboardList,
  HelpCircle,
  ShieldAlert,
  Lightbulb,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { UrgencyBanner, LikelihoodBadge } from '../components/UrgencyBadge'
import { useAppSelector } from '../hooks/redux'
import { cn } from '../lib/utils'

function SectionTitle({
  icon: Icon,
  title,
  accent,
}: {
  icon: React.ElementType
  title: string
  accent?: string
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={cn('p-1.5 rounded-md', accent ?? 'bg-teal-500/10')}>
        <Icon className="w-3.5 h-3.5 text-teal-400" />
      </div>
      <h3 className="text-sm font-semibold font-body text-foreground/90 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  )
}

export function ConsultationResult() {
  const { status, result, error } = useAppSelector((s) => s.consultation)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((status === 'success' || status === 'error') && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [status])

  if (status === 'idle') return null

  if (status === 'loading') {
    return (
      <div ref={ref} className="space-y-4 animate-fade-up">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-muted/40 border border-border/30 overflow-hidden relative"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
        ))}
        <p className="text-center text-sm text-muted-foreground font-body animate-pulse-slow">
          Analysing your symptoms…
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div ref={ref} className="animate-fade-up">
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive font-body">Consultation Failed</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!result) return null

  return (
    <div ref={ref} className="space-y-4 animate-fade-up">
      {/* Symptom Summary */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Consultation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground font-body leading-relaxed italic">
            "{result.symptom_summary}"
          </p>
          <UrgencyBanner level={result.urgency_level} />
        </CardContent>
      </Card>

      {/* Possible Conditions */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
        <CardContent className="p-5">
          <SectionTitle icon={Activity} title="Possible Conditions" />
          <div className="space-y-3">
            {result.possible_conditions.map((condition, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/40 bg-background/40 p-3 space-y-2"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium font-body text-foreground">
                    {condition.name}
                  </span>
                  <LikelihoodBadge likelihood={condition.likelihood} />
                </div>
                {condition.key_symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {condition.key_symptoms.map((sym, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs text-muted-foreground border-border/50 font-body"
                      >
                        {sym}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
        <CardContent className="p-5">
          <SectionTitle icon={Lightbulb} title="Recommended Actions" accent="bg-amber-500/10" />
          <ul className="space-y-2">
            {result.recommended_actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80 font-body leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Urgent Symptoms */}
      {result.urgent_symptoms.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-5">
            <SectionTitle icon={ShieldAlert} title="Warning Signs" accent="bg-red-500/10" />
            <ul className="space-y-2">
              {result.urgent_symptoms.map((sym, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0 text-xs mt-1">●</span>
                  <span className="text-sm text-foreground/80 font-body leading-relaxed">{sym}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Follow-up Questions */}
      {result.follow_up_questions.length > 0 && (
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5">
            <SectionTitle icon={HelpCircle} title="Follow-up Questions" accent="bg-blue-500/10" />
            <ul className="space-y-2">
              {result.follow_up_questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 font-mono text-xs shrink-0 mt-0.5">Q{i + 1}</span>
                  <span className="text-sm text-foreground/80 font-body leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Separator className="opacity-30" />
      <div className="flex items-start gap-2">
        <ClipboardList className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground/60 font-body leading-relaxed italic">
          {result.disclaimer}
        </p>
      </div>
    </div>
  )
}
