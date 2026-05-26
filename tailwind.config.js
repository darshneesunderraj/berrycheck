/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        strawberry: { 50: '#fff0f3', 100: '#ffe0e6', 200: '#ffc2d1', 300: '#ffa0b4', 400: '#ff7a94', 500: '#ff4d6d', 600: '#e6264a', 700: '#c41e3a', 800: '#9b1a30', 900: '#751525' },
        cherry: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d' },
        butter: { 50: '#fffdf5', 100: '#fff9e6', 200: '#fff3cc', 300: '#ffecb3', 400: '#ffe49a', 500: '#ffdc80', 600: '#f5c842', 700: '#d4a830', 800: '#a88420', 900: '#7a6015' },
        sage: { 50: '#f4f9f4', 100: '#e6f2e6', 200: '#cee5ce', 300: '#a8d4a8', 400: '#7cc07c', 500: '#5ca85c', 600: '#4a8f4a', 700: '#3d733d', 800: '#305830', 900: '#243f24' },
        cream: { 50: '#fffef9', 100: '#fefce8', 200: '#fdf9d0', 300: '#fcf5b8', 400: '#faf0a0', 500: '#f7eb88', 600: '#e0d060', 700: '#b8a848', 800: '#908030', 900: '#685818' },
        peach: { 50: '#fff7f0', 100: '#ffe8d6', 200: '#ffd1ad', 300: '#ffb885', 400: '#ff9e5c', 500: '#ff8533', 600: '#e66820', 700: '#c05018', 800: '#963c10', 900: '#6c2a0a' },
        coral: { 50: '#fff5f2', 100: '#ffe6de', 200: '#ffccbd', 300: '#ffab9c', 400: '#ff857b', 500: '#ff6259', 600: '#e84540', 700: '#c43430', 800: '#9c2a27', 900: '#74211f' },
        sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'paper': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'card': '0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'warm': '0 4px 20px rgba(255,150,100,0.15), 0 1px 4px rgba(0,0,0,0.04)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 2s infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.15)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
