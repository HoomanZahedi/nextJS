/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.versland.io",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/id/**",
      },
    ],
  },
};
