/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove console logs only in production, excluding error logs
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
