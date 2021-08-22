module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        lars: "url('/hashdot.png')",
      }),
      backgroundSize: {
        sizeLars: '350px',
      },
      colors: {
        brand: '#B2FFC8',
        brandHover: '#97D4A8',
      },
      fontFamily: {
        headline: ['Montserrat'],
      },
      fontSize: {
        xxs: '0.65rem',
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ['responsive', 'hover'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
