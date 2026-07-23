/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — identical in light & dark
        primary: {
          DEFAULT: '#418839',
          dark: '#356f2e',
        },
        danger: '#EC392E',
        warning: '#F5A623',
        info: '#155DFC',
        // Role-driven surfaces, resolved via CSS variables (see index.css)
        secondary: 'rgb(var(--tf-secondary) / <alpha-value>)',
        page: 'rgb(var(--tf-page) / <alpha-value>)',
        card: 'rgb(var(--tf-card) / <alpha-value>)',
        stroke: 'rgb(var(--tf-stroke) / <alpha-value>)',
        content: 'rgb(var(--tf-content) / <alpha-value>)',
        muted: 'rgb(var(--tf-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 1px 4px rgba(0,0,0,0.10)',
        card: '0 4px 24px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [],
};
