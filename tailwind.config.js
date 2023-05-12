/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        extend: {
            colors: {
                "main-area": "#ECF0F1",
                sidebar: "#2980B9",
                "header-footer": "#3498DB",
                buttons: "#2C3E50",
                selected: "#E74C3C",
            },
            gridTemplateRows: {
                10: "repeat(10, minmax(0, 1fr))",
                12: "repeat(12, minmax(0, 1fr))",
            },
            gridRow: {
                "span-8": "span 8 / span 8",
                "span-9": "span 9 / span 9",
                "span-10": "span 10 / span 10",
                "span-11": "span 11 / span 11",
            },
        },
    },
    plugins: [],
};
