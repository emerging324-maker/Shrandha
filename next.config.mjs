/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/services",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
