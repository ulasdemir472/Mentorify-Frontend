/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.mentorcruise.com", "*", "i.pravatar.cc", "localhost"],
  },
  env: {
    SECRET_API: process.env.SECRET_API,
  },
};

module.exports = nextConfig;
