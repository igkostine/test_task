/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors")

const colors = {
	transparent: twColors.transparent,
	black: twColors.black,
	white: twColors.white,
	primary: "#FF9902",
	secondary: "#161D25",
	"bg-color": "#F2F2F5",
}

export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		colors,
		extend: {},
	},
	plugins: [],
}
