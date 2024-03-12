// tailwind.config.js
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./public/index.html',
		'./src/pages/**/*.{html,js,jsx}',
		'./src/components/**/*.{html,js,jsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
