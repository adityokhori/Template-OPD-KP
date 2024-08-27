/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#232323',
        secondary: '#ff6600',
        footer: '#C2C2C2',
        abuabu: '#404040',
        searchbg: '#d9d9d9',
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
        // test: ['Poppins', 'sans-serif'],
        test: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': '34px',
        'h2': '24px',
        'h3': '18px',
        'teks': '14px',
        'teksButton': '10px',
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
      },
    },
  },
  variants: {},
  plugins: [],
}