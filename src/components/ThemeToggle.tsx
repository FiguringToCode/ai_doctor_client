import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toggleTheme } from '../store/slices/themeSlice'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((s) => s.theme.theme)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative w-4 h-4 block">
        {/* Sun icon — visible in dark mode */}
        <Sun
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          }`}
        />
        {/* Moon icon — visible in light mode */}
        <Moon
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </span>
    </Button>
  )
}