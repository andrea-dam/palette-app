/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            gridTemplateRows: {
                10: "repeat(10, minmax(0, 1fr))",
            },
            gridRow: {
                "span-8": "span 8 / span 8",
            },
        },
    },
    plugins: [],
};
