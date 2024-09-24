/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'gagadget.com',
      'upload.wikimedia.org',
      'picsum.photos',
      'res.cloudinary.com',
    ], // Agregamos picsum.photos para imágenes remotas
  },
};

export default nextConfig;
