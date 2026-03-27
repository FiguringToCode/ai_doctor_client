import { Trash2, Clock, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { clearHistory, removeHistoryEntry } from '../store/slices/consultationSlice'
import { formatTimestamp } from '../lib/utils'
import type { UrgencyLevel } from '../types'
import { cn } from '../lib/utils'

const urgencyColor: Record<UrgencyLevel, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-orange-400',
  emergency: 'bg-red-400 animate-pulse',
}

export function HistorySidebar() {
  const dispatch = useAppDispatch()
  const history = useAppSelector((s) => s.consultation.history)

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center px-4">
        <Clock className="w-8 h-8 text-muted-foreground/30 mb-2" />
        <p className="text-sm text-muted-foreground/50 font-body">No consultations yet</p>
        <p className="text-xs text-muted-foreground/30 font-body mt-1">
          Your recent sessions will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-muted-foreground/60 font-body uppercase tracking-wider">
          Recent ({history.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground/50 hover:text-destructive"
          onClick={() => dispatch(clearHistory())}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear
        </Button>
      </div>

      <ScrollArea className="max-h-[480px]">
        <div className="space-y-2 pr-1">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="group relative rounded-lg border border-border/40 bg-background/40 p-3 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all duration-200 cursor-default"
            >
              {/* Urgency dot */}
              <div className="flex items-start gap-2">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full shrink-0 mt-1.5',
                    urgencyColor[entry.result.urgency_level]
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium font-body text-foreground/80 truncate">
                    {entry.request.symptoms.slice(0, 60)}
                    {entry.request.symptoms.length > 60 ? '…' : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground/50 font-mono">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-xs border-border/40 px-1.5 py-0 font-body capitalize">
                      {entry.result.urgency_level}
                    </Badge>
                  </div>
                  {entry.result.possible_conditions.length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
                      <span className="text-xs text-muted-foreground/50 font-body truncate">
                        {entry.result.possible_conditions[0].name}
                        {entry.result.possible_conditions.length > 1
                          ? ` +${entry.result.possible_conditions.length - 1}`
                          : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => dispatch(removeHistoryEntry(entry.id))}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground/40"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
