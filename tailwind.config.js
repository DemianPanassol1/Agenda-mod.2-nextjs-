module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1280px'
      },
      colors: {
        'black': '#212121'
      },
      container: {
        center: true,
        padding: {
          default: '1rem',
          md: '2rem',
          xl: '0'
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
