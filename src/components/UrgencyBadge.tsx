import { AlertTriangle, AlertCircle, Info, Siren } from 'lucide-react'
import { Badge } from './ui/badge'
import type { UrgencyLevel, Likelihood } from '../types'
import { cn } from '../lib/utils'

const urgencyConfig = {
  low: {
    label: 'Low Urgency',
    icon: Info,
    variant: 'low' as const,
    bg: 'bg-emerald-500/5 border-emerald-500/20',
    text: 'text-emerald-400',
  },
  medium: {
    label: 'Medium Urgency',
    icon: AlertCircle,
    variant: 'medium' as const,
    bg: 'bg-amber-500/5 border-amber-500/20',
    text: 'text-amber-400',
  },
  high: {
    label: 'High Urgency',
    icon: AlertTriangle,
    variant: 'high' as const,
    bg: 'bg-orange-500/5 border-orange-500/20',
    text: 'text-orange-400',
  },
  emergency: {
    label: 'EMERGENCY',
    icon: Siren,
    variant: 'emergency' as const,
    bg: 'bg-red-500/5 border-red-500/20',
    text: 'text-red-400',
  },
}

const likelihoodConfig = {
  low: { variant: 'low' as const, label: 'Low' },
  medium: { variant: 'medium' as const, label: 'Medium' },
  high: { variant: 'high' as const, label: 'High' },
}

export function UrgencyBanner({ level }: { level: UrgencyLevel }) {
  const config = urgencyConfig[level]
  const Icon = config.icon
  return (
    <div className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', config.bg)}>
      <Icon className={cn('w-5 h-5 shrink-0', config.text)} />
      <div>
        <p className={cn('text-sm font-semibold font-body', config.text)}>{config.label}</p>
        {level === 'emergency' && (
          <p className="text-xs text-red-400/70 font-body mt-0.5">
            Seek immediate emergency medical attention
          </p>
        )}
      </div>
      <Badge variant={config.variant} className="ml-auto capitalize">
        {level}
      </Badge>
    </div>
  )
}

export function LikelihoodBadge({ likelihood }: { likelihood: Likelihood }) {
  const config = likelihoodConfig[likelihood]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
