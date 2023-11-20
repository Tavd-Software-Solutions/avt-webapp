// eslint-disable-next-line no-undef
module.exports = {
	content: ["./src/**/*.tsx", "./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
	mode: "jit",
	darkMode: false,
	theme: {
		extend: {
			colors: {
				brand: {
					300: "#996dff",
					500: "#8257e6",
				},
			},
			borderRadius: {
				md: "4px",
				area: "50px",
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("@tailwindcss/forms")],
};
