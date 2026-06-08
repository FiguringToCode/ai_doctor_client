import { useEffect } from 'react'
import { Heart, Clock, LogOut, Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Separator } from './components/ui/separator'
import { ConsultationForm } from './components/ConsultationForm'
import { ConsultationResult } from './components/ConsultationResult'
import { HistorySidebar } from './components/HistorySidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { Login } from './components/Login'
import { useAppSelector, useAppDispatch } from './hooks/redux'
import { checkAuth, logout } from './store/slices/authSlice'

export function App() {
  const dispatch = useAppDispatch()
  const historyCount = useAppSelector((s) => s.consultation.history.length)
  const theme = useAppSelector((s) => s.theme.theme)
  const authStatus = useAppSelector((s) => s.auth.status)
  const user = useAppSelector((s) => s.auth.user)

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

  // Check auth on mount
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  // ── Loading state ────────────────────────────────────────
  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-500/15 border border-teal-500/20">
            <Heart className="w-6 h-6 text-teal-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading…</span>
          </div>
        </div>
      </div>
    )
  }

  // ── Unauthenticated → show Login ────────────────────────
  if (authStatus === 'unauthenticated') {
    return <Login />
  }

  // ── Authenticated → show main app ───────────────────────
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

            {/* Spacer + user info + theme toggle */}
            <div className="ml-auto flex items-center gap-3">
              {/* User avatar & name */}
              {user && (
                <div className="hidden sm:flex items-center gap-2">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-7 h-7 rounded-full border border-border/50 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-teal-500/15 border border-teal-500/20 flex items-center justify-center text-xs font-semibold text-teal-400">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground/70 font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground/80 font-body hidden md:block select-none">
                  {theme === 'dark' ? 'Dark' : 'Light'} mode
                </span>
                <ThemeToggle />
              </div>

              {/* Logout button */}
              <button
                id="logout-btn"
                onClick={handleLogout}
                className="p-2 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
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
                  Your Health is now {' '}
                  <span className="text-teal-400">Analysed</span>
                  {' '}by AI.
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
            <p className="text-xs text-muted-foreground/100 font-body">
              © {new Date().getFullYear()} AI Doctor Consultant · For informational purposes only
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}