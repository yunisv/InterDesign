import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(30, 100%, 97%)',
        foreground: 'hsl(0, 0%, 20%)',
        primary: 'hsl(35, 84%, 62%)',
        'primary-dark': 'hsl(35, 84%, 52%)',
        secondary: 'hsl(0, 0%, 30%)',
        accent: 'hsl(35, 84%, 62%)',
        'accent-dark': 'hsl(35, 84%, 52%)',
        muted: 'hsl(0, 0%, 90%)',
        'muted-foreground': 'hsl(0, 0%, 45%)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
