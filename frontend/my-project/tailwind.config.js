/** @type {import('tailwindcss').Config} */


export default {
  
  
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}', // Add paths to all your components
    // 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {

      colors: {
        beige: {
          100: '#fdf3e7', // Soft beige (plate color)
        },
        tomato: {
          600: '#e63946', // Tomato red (sauce color)
        },
        basil: {
          600: '#457b9d', // Basil green
        },
      },

    },
  },


  
  plugins: [],
}
