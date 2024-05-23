import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "student_Admin-color": "var(--student_Admin-color)",
        "teacher-color": "var(--teacher-color)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
