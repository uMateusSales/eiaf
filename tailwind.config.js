/** @type {import('tailwindcss').Config} */
module.exports = {
  // Garante que o Tailwind analise todos os seus arquivos React e componentes shadcn
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aqui você pode adicionar cores personalizadas se necessário
      colors: {
        // Exemplo: 'app-green': '#22c55e',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-merge')],
};
