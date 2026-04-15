/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode - Pure Black with Green Neon
        'dark-bg': '#000000',
        'dark-surface': '#0f0f0f',
        'dark-card': '#1a1a1a',
        'dark-border': 'rgba(0, 255, 136, 0.15)',
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#a8c5dd',
        'dark-text-tertiary': '#6b7280',

        // Light Mode
        'light-bg': '#ffffff',
        'light-surface': '#f0f9ff',
        'light-border': 'rgba(0, 255, 136, 0.2)',
        'light-text-primary': '#000000',
        'light-text-secondary': '#0f5a6f',

        // NEON Colors - Primary GREEN
        'neon-green': '#00ff88',
        'neon-green-dark': '#00cc6f',
        'neon-green-light': '#33ff99',

        // NEON Colors - Secondary
        'neon-blue': '#0099ff',
        'neon-purple': '#a855f7',
        'neon-pink': '#ff006e',
        'neon-magenta': '#ff006e',

        // Utility Colors
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '30px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '52px'],
        '6xl': ['60px', '64px'],
      },
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-left': 'max(1rem, env(safe-area-inset-left))',
        'safe-right': 'max(1rem, env(safe-area-inset-right))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          'from': { transform: 'translateY(-20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        bounceIn: {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 255, 136, 0.5)',
        'glow-xl': '0 0 60px rgba(0, 255, 136, 0.7)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 25px rgba(0, 255, 136, 0.15)',
        'neon': '0 0 30px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
