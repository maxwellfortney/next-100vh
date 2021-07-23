module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "100vh-cyan": "#00FFFF",
        "100vh-blue": "#0085FF",
        "100vh-purple": "#8000FF",
        "100vh-gray": "#131313"
      },
      keyframes: {
        'bounce-rLeft': {
          '0%, 100%': { transform: 'translate(0,  0px) rotate(-20deg)' },
          '50%': { transform: 'translate(0, 15px) rotate(-20deg)' },
        },
        'bounce-rRight': {
          '0%, 100%': { transform: 'translate(0,  0px) rotate(20deg)' },
          '50%': { transform: 'translate(0, 15px) rotate(20deg)' },
        }
      },
      animation: {
        'bounce-rLeft': 'bounce-rLeft 3s linear infinite',
        'bounce-rRight': 'bounce-rRight 3s linear infinite',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
