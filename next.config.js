/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		domains: ["picsum.photos", "ui-avatars.com"],
	},
};

module.exports = nextConfig;
