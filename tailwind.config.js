/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: '#87CEEB',
        deepNavy: '#000080',
        auroraViolet: '#A78BFA',
        sunsetOrange: '#FD5E53',
        frostWhite: '#F0F8FF',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'heavy': '40px',
      }
    },
  },
  plugins: [],
}

