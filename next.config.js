/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.mentorcruise.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "mentorify-backend.onrender.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "mentorify.devlermedya.net" },
      { protocol: "http", hostname: "backend" },
      { protocol: "http", hostname: "backend-svc" }
    ],
  },
  // We no longer inline SECRET_API here to ensure client-side uses relative paths
  // while server-side reads process.env directly at runtime.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
