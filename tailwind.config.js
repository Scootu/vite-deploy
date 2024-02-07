/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        opacity: "0.25",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out forwards",
        oWiggle: "oWiggle 2s ease-in-out forwards",
        smouth_down: "smouth_down 0.4s ease-in-out forwards",
        scroll_Up: "scroll_Up 0.6s ease-in-out forwards",
        smouth: "smouth 0.5s ease forwards",
      },
      keyframes: {
        smouth: {
          "0%": { transformOrigin: "top", transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        scroll_Up: {
          from: {
            opacity: "0.5",
          },
          to: {
            opacity: "1",
            transform: "translateY(-10%)",
          },
        },
        oWiggle: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        wiggle: {
          from: { opacity: "1" },
          to: { opacity: "0", visibility: "hidden", position: "absolute" },
        },
        smouth_down: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "transform: translateY(0)" },
        },
      },
      minHeight: {
        128: "34.375rem",
      },
      height: {
        128: "296px",
        144: "492px",
      },
      textColor: {
        "text-blinder": "#46474a",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".btn": {
          padding: "2px 10px",
          border: "1px solid #000",
          cursor: "pointer",
          borderRadius: "11px",
        },
        ".smouthTran": {
          transition: " background-color .3s,opacity .3s;",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
