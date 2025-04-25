/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "localhost",
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
    ],
  },
};

export default nextConfig;
