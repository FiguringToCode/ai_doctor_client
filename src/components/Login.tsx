import { Heart, Shield, Brain, Clock, ArrowRight } from 'lucide-react'
import { authAPI } from '../lib/axios.lib'

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Advanced symptom assessment powered by cutting-edge AI models',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    desc: 'Your health data is encrypted and never shared with third parties',
  },
  {
    icon: Clock,
    title: 'Instant Consultations',
    desc: 'Get preliminary assessments in seconds, any time of day',
  },
]

export function Login() {
  const handleGoogleLogin = () => {
    authAPI.loginWithGoogle()
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body relative overflow-hidden">
      {/* ── Animated ambient background ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-teal-500/[0.07] blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-teal-600/[0.05] blur-[100px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.04] blur-[100px] animate-pulse [animation-delay:3s]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Main layout ──────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Top bar ─────────────────────────────────────────── */}
        <header className="border-b border-border/30 bg-background/60 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-500/15 border border-teal-500/20">
                <Heart className="w-4 h-4 text-teal-400" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight">
                AI Doctor{' '}
                <span className="text-teal-400 font-normal text-sm">Consultant</span>
              </span>
            </div>
          </div>
        </header>

        {/* ── Hero section ────────────────────────────────────── */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Branding & copy */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 text-xs font-medium text-teal-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                </span>
                AI-Powered Health Assistant
              </div>

              <div className="space-y-4">
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1]">
                  Your Health,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
                    Analysed
                  </span>
                  <br />
                  by AI.
                </h1>
                <p className="text-base text-muted-foreground/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Get instant preliminary health assessments powered by advanced AI.
                  Describe your symptoms and receive actionable insights — anytime, anywhere.
                </p>
              </div>

              {/* Feature chips */}
              <div className="space-y-3">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 text-left rounded-xl p-3 transition-colors hover:bg-muted/40 group"
                  >
                    <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-teal-500/10 border border-teal-500/15 group-hover:bg-teal-500/15 transition-colors">
                      <f.icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/90">{f.title}</p>
                      <p className="text-xs text-muted-foreground/60 leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Sign-in card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                {/* Glass card */}
                <div className="relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/5 p-8 space-y-7">
                  {/* Subtle glow behind card */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-teal-500/10 to-transparent opacity-60 -z-10 blur-sm" />

                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-teal-400" />
                    </div>
                    <h2 className="font-sans text-xl font-bold tracking-tight">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground/60">
                      Sign in to access your AI health consultant
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground/40 font-medium">
                      continue with
                    </span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  {/* Google sign-in button */}
                  <button
                    id="google-sign-in-btn"
                    onClick={handleGoogleLogin}
                    className="group relative w-full flex items-center justify-center gap-3 rounded-xl border border-border/60 bg-background/80 hover:bg-muted/60 px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-teal-500/5 active:scale-[0.98] cursor-pointer"
                  >
                    {/* Google icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Sign in with Google</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground/60 group-hover:translate-x-0.5 transition-all ml-auto" />
                  </button>

                  {/* Trust signals */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
                      <Shield className="w-3 h-3" />
                      <span>Encrypted</span>
                    </div>
                    <div className="w-px h-3 bg-border/40" />
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
                      <Clock className="w-3 h-3" />
                      <span>Instant setup</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[11px] text-muted-foreground/35 mt-5 leading-relaxed px-4">
                  By signing in, you agree that this is an AI tool and
                  <span className="text-muted-foreground/50"> not a substitute for professional medical advice</span>.
                </p>
              </div>
            </div>

          </div>
        </main>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="border-t border-border/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground/40">
              © {new Date().getFullYear()} AI Doctor Consultant
            </p>
            <p className="text-[11px] text-muted-foreground/30">
              For informational purposes only
            </p>
          </div>
        </footer>

      </div>
    </div>
  )
}
