module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "100vh-cyan": "#00FFFF",
        "100vh-blue": "#0085FF",
        "100vh-purple": "#8000FF",
        "100vh-gray": "#131313",
      },
      keyframes: {
        "bounce-rLeft": {
          "0%, 100%": { transform: "translate(0,  0px) rotate(-20deg)" },
          "50%": { transform: "translate(0, 15px) rotate(-20deg)" },
        },
        "bounce-rRight": {
          "0%, 100%": { transform: "translate(0,  0px) rotate(20deg)" },
          "50%": { transform: "translate(0, 15px) rotate(20deg)" },
        },
        riseY: {
          "0%": { opacity: 0, transform: "translateY(15px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn .35s cubic-bezier(0.645, 0.045, 0.355, 1)",
        fadeAndRise:
          "fadeIn 1s cubic-bezier(0.645, 0.045, 0.355, 1), rise 1s cubic-bezier(0.645, 0.045, 0.355, 1)",
        "bounce-rLeft": "bounce-rLeft 3s linear infinite",
        "bounce-rRight": "bounce-rRight 3s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
