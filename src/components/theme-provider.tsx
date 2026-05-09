'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
type ColorTheme = 'green' | 'blue' | 'orange' | 'rose'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  defaultColorTheme?: ColorTheme
  storageKey?: string
  colorStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  fontSize: number
  setFontSize: (size: number) => void
  colorTheme: ColorTheme
  setColorTheme: (colorTheme: ColorTheme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  fontSize: 1,
  setFontSize: () => null,
  colorTheme: 'green',
  setColorTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  defaultColorTheme = 'green',
  storageKey = 'app-ui-theme',
  colorStorageKey = 'app-color-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialState.theme)
  const [fontSize, setFontSizeState] = useState<number>(initialState.fontSize)
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(initialState.colorTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    const storedFontSize = localStorage.getItem('app-font-size')
    const storedColorTheme = localStorage.getItem(colorStorageKey) as ColorTheme | null

    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme(defaultTheme)
    }

    if (storedFontSize) {
      setFontSizeState(parseFloat(storedFontSize))
    }
    
    if (storedColorTheme) {
        setColorThemeState(storedColorTheme)
    } else {
        setColorThemeState(defaultColorTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    // Remove previous theme to avoid conflicts
    root.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            root.classList.remove(className)
        }
    })
    root.classList.add(`theme-${colorTheme}`)
    localStorage.setItem(colorStorageKey, colorTheme)
  }, [colorTheme, colorStorageKey])
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--font-scale-factor', fontSize.toString());
    localStorage.setItem('app-font-size', fontSize.toString());
  }, [fontSize]);

  const setFontSize = (size: number) => {
    setFontSizeState(size);
  }
  
  const setColorTheme = (color: ColorTheme) => {
    setColorThemeState(color);
  }

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    colorTheme,
    setColorTheme
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
