/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* subtle-white */
        input: "var(--color-input)", /* surface-elevation */
        ring: "var(--color-ring)", /* neon-cyan */
        background: "var(--color-background)", /* rich-dark */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* neon-cyan */
          foreground: "var(--color-primary-foreground)", /* dark-navy */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* deep-navy */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-500 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* deep-navy */
          foreground: "var(--color-muted-foreground)", /* text-secondary */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* magenta */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* surface-elevation */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* surface-elevation */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        // Brand-specific colors
        'neon-cyan': "var(--color-primary)", /* neon-cyan */
        'deep-navy': "var(--color-secondary)", /* deep-navy */
        'magenta': "var(--color-accent)", /* magenta */
        'surface': "var(--color-surface)", /* surface-elevation */
        'text-primary': "var(--color-text-primary)", /* white */
        'text-secondary': "var(--color-text-secondary)", /* slate-400 */
        'professional-blue': "var(--color-professional-blue)", /* blue-500 */
        'success-green': "var(--color-success-green)", /* green-400 */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.3' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'micro': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'particle-float': 'particle-float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink 0.75s step-end infinite',
        'holographic-shimmer': 'holographic-shimmer 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.7' },
          '50%': { transform: 'translateY(-10px)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 224, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 224, 0.3)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'holographic-shimmer': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 255, 224, 0.1)',
        'glow-accent': '0 0 20px rgba(255, 0, 127, 0.1)',
        'glow-strong': '0 0 30px rgba(0, 255, 224, 0.3)',
        'card-elevated': '0 8px 32px rgba(0, 255, 224, 0.1)',
        'terminal': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'holographic': '0 4px 20px rgba(0, 255, 224, 0.1), 0 1px 3px rgba(0, 255, 224, 0.2)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'holographic': 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 224, 0.1) 50%, transparent 70%)',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-panel': {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-elevated)',
        },
        '.glow-primary': {
          boxShadow: 'var(--glow-primary)',
        },
        '.glow-accent': {
          boxShadow: 'var(--glow-accent)',
        },
        '.transform-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.magnetic-hover': {
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.magnetic-hover:hover': {
          transform: 'scale(1.05) translateZ(10px)',
        },
        '.terminal': {
          background: '#0a0a0a',
          color: '#00ff00',
          fontFamily: 'JetBrains Mono, monospace',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        },
        '.holographic': {
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 224, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'holographic-shimmer 3s ease-in-out infinite',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}