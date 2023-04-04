/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1400px',
      },
      colors: {
        'primary': '#296BEF',
        'primary-light': '#DAE2FF',
        'primary-dark': '#0040A2',
        'secondary': '#FF9530',
        'secondary-light': '#FFEBD8',

        'secondary-text': '#A3A1AC',
        'border': '#F0F0F0',
        'bg': '#F2F1F4',
        'light-gray': '#EAE9EE',
        'medium-gray': '#CCCCD2',
        'black': '#1B1B1F',

        'error': '#FF4539',
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
