/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],  
    theme: {
    extend: {
      colors: {
        violet: 'rgba(126, 51, 224, 1)',
        primary: '#F26043',
        secondary: '#0AE7FF',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to right, #f97316, #facc15)',
      },
      container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
      keyframes: {
        'accordion-down': {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        'accordion-up': {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        flyIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slide: {
          '0%': { backgroundPosition: '100% 0' },
          '50%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fly-in': 'flyIn 0.3s ease-out forwards',
        'slide-background': 'slide 3s infinite ease-in-out',
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
