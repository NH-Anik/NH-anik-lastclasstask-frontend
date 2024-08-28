/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    fontFamily: {
      onetext: ['Dancing Script', 'cursive'],

    },
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'pro': '#e11d48',
      'navup': '#0c0c14',
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
