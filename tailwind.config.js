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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        flyIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flyToCart: {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(var(--cart-x), var(--cart-y)) scale(0.4)',
            opacity: '0',
          },
        },
        cartBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.1)' },
        },
        cartPing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fly-in': 'flyIn 0.3s ease-out forwards',
        'fly-to-cart': 'flyToCart 1s forwards ease-in-out',
        'cart-bounce': 'cartBounce 1.3s ease-in-out',
        'cart-ping': 'cartPing 5s cubic-bezier(0, 0, 0.2, 1)'
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
