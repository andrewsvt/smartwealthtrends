/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        lgPlus: '1180px',
        xl: '1400px',
      },
      colors: {
        'primary': '#296BEF',
        'primary-light': '#E1E8FF',
        'primary-dark': '#0040A2',
        'secondary': '#FF9530',
        'secondary-light': '#FFEBD8',

        'almost-white': "#F7F7F7",
        'border': '#F0F0F0',
        'bg': '#F2F1F4',
        'light-gray': '#EBEAEF',
        'medium-gray': '#CCCCD2',
        'secondary-text': '#A3A1AC',
        'black': '#1B1B1F',

        'error': '#F43F5E',
        'error-dark': '#E11D48',
        'success': '#34F46A'
      },

      fontSize: {
        xs:['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        basePlus: ['18px', '26px'],
        lg: ['22px', '28px'],
        xl: ['32px', '40px'],
      }
    },
  },
  plugins: [],
}
