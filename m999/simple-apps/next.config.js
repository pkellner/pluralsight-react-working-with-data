/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: "file:./dev.db",
  },
};

module.exports = nextConfig;
