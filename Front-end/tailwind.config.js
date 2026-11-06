/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#EFEFEE',
        cardBorder: '#D6C2AC',
        primaryDark: '#0B192C',
        susGreen: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        badgeBlue: {
          bg: '#EBF5FB',
          text: '#0284C7',
          border: '#BAE6FD',
        },
        warmMuted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
