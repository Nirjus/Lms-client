import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:["class",'[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens:{
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
       "800px": "800px",
       "1300px": "1300px",
       "1500px":"1500px",
       "400px":"400px"
           },
    },
  },
 
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light', 'dark'],
     
  },
}
export default config
