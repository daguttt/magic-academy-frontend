/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
    ];
  },
  images: {
    domains: ['gagadget.com'], // To be able to add halo's default image in courses
  }
};

export default nextConfig;
