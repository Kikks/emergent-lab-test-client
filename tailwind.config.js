module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#D0E8DF",
					500: "#2BDA53"
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
