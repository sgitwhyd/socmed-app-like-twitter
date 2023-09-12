/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./modules/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./@/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					blue: {
						main: "rgb(29, 155, 240)",
					},
					gray: {
						100: "rgb(47,51,54)",
						200: "rgb(113,118,123)",
						300: "rgb(231, 233, 234)",
						400: "rgb(22, 24, 28)",
					},
					white: {
						100: "#EFF3F4",
					},
				},
			},
		},
	},
	plugins: [],
};
