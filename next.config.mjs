/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

async rewrites() {
  return [
    {
      source: '/sitemap/:id.xml',
      destination: '/sitemap/:id',
    },
  ];
},

  async headers() {
    return [
      {
        // Apply caching headers to all sitemap sub-paths
        source: '/sitemap/:path*',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=3600, s-maxage=3600' 
          },
        ],
      },
    ];
  },
};

export default nextConfig;