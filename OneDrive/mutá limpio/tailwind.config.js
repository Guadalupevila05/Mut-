
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#FBEFEB',
          dark: '#F4DDD5',
        },
        rose: {
          DEFAULT: '#E8C8C2',
          dark: '#D9A9A0',
        },
        dusty: {
          DEFAULT: '#B08B85',
        },
        warmWhite: {
          DEFAULT: '#FBF8F6',
          dark: '#FCFAF8',
        },
        softGray: {
          DEFAULT: '#EFEAE7',
          dark: '#D8D0CB',
        },
        ink: {
          DEFAULT: '#1A1614',
        },
        accent: {
          DEFAULT: '#C2766F',
        },
        darkBg: {
          DEFAULT: '#1A1414',
          alt: '#241D1B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(194, 118, 111, 0.12)',
        'soft-dark': '0 8px 30px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
