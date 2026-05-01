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
  async rewrites() {
    return [
      {
        source: '/public/uploads/:path*',
        destination: `${process.env.SECRET_API}/public/uploads/:path*`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
