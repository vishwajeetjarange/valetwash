/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A2240',
          navyDark: '#061528',
          navyLight: '#113563',
          azure: '#1B6CA8',
          azureLight: '#4A90E2',
          cyan: '#00E5FF',
          cyanGlow: '#00F0FF',
          pearl: '#F8FAFC',
          slate: '#0D131D',
          slateCard: '#131B2A',
          slateBorder: '#1E2B42',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'valet': '0px 8px 24px rgba(10, 34, 64, 0.08)',
        'valet-lg': '0px 16px 36px rgba(10, 34, 64, 0.16)',
        'valet-dark': '0px 10px 30px rgba(0, 0, 0, 0.45)',
        'cyan-glow': '0px 0px 20px rgba(0, 229, 255, 0.35)',
        'cyan-glow-lg': '0px 0px 30px rgba(0, 229, 255, 0.55)',
        'azure-glow': '0px 0px 20px rgba(74, 144, 226, 0.35)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'radar-pulse': 'radar 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
