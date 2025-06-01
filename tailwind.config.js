export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cf-red': '#ff0000',
        'cf-orange': '#ff8c00',
        'cf-purple': '#aa00aa',
        'cf-blue': '#0000ff',
        'cf-teal': '#03a89e',
        'cf-green': '#28a745',
        'cf-gray': '#808080',
      }
    }
  },
  plugins: []
}