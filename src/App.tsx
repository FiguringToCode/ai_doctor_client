import { useEffect } from 'react'
import { Heart, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Separator } from './components/ui/separator'
import { ConsultationForm } from './components/ConsultationForm'
import { ConsultationResult } from './components/ConsultationResult'
import { HistorySidebar } from './components/HistorySidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { useAppSelector } from './hooks/redux'

export function App() {
  const historyCount = useAppSelector((s) => s.consultation.history.length)
  const theme = useAppSelector((s) => s.theme.theme)

  // Apply / remove dark class on <html> whenever Redux theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-teal-600/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-teal-400/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ── Top nav ─────────────────────────────────────── */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-500/15 border border-teal-500/20">
                <Heart className="w-4 h-4 text-teal-400" />
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                AI Doctor{' '}
                <span className="text-teal-400 font-normal text-sm">Consultant</span>
              </span>
            </div>

            <Separator orientation="vertical" className="h-5 mx-1 opacity-30" />

            <span className="text-xs text-muted-foreground/50 font-body hidden sm:block">
              Powered by AI · Not a substitute for medical advice
            </span>

            {/* Spacer + theme toggle */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-muted-foreground/40 font-body hidden md:block select-none">
                {theme === 'dark' ? 'Dark' : 'Light'} mode
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* ── Main content ─────────────────────────────────── */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

            {/* Left: Form + Result */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="font-display text-3xl font-bold tracking-tight">
                  Your Health,{' '}
                  <span className="text-teal-400">Analysed</span>
                </h1>
                <p className="text-sm text-muted-foreground/70 font-body max-w-lg">
                  Describe your symptoms and receive an AI-powered preliminary assessment.
                  Always verify with a licensed physician.
                </p>
              </div>

              {/* Form card */}
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-sm">
                <ConsultationForm />
              </div>

              {/* Results */}
              <ConsultationResult />
            </div>

            {/* Right: History sidebar (desktop) */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-sm sticky top-[72px]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <h2 className="font-display text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                    Session History
                  </h2>
                  {historyCount > 0 && (
                    <span className="ml-auto text-xs font-mono text-teal-400/70 bg-teal-500/10 border border-teal-500/20 rounded-full px-2 py-0.5">
                      {historyCount}
                    </span>
                  )}
                </div>
                <HistorySidebar />
              </div>

              {/* Mobile tabs */}
              <div className="lg:hidden">
                <Tabs defaultValue="form">
                  <TabsList className="w-full">
                    <TabsTrigger value="form" className="flex-1">Consultation</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">
                      History {historyCount > 0 && `(${historyCount})`}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="form" className="mt-4" />
                  <TabsContent value="history" className="mt-4">
                    <HistorySidebar />
                  </TabsContent>
                </Tabs>
              </div>
            </aside>
          </div>
        </main>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="border-t border-border/30 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground/40 font-body">
              © {new Date().getFullYear()} AI Doctor Consultant · For informational purposes only
            </p>
            <p className="text-xs text-muted-foreground/30 font-mono">
              v1.0.0 · Vite + Redux Toolkit + shadCN
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}