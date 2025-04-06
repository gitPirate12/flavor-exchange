/** @type {import('next').NextConfig} */

const nextConfig = {
  //next auth middleware import path fix according to next-auth documentation
  transpilePackages: ["next-auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
