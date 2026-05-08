const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      // /sitemap/0.xml → /sitemap/0
      {
        source: '/sitemap/:id.xml',
        destination: '/sitemap/:id',
      },
      // /sitemap.xml → served by your sitemap-index.xml route
      {
        source: '/sitemap.xml',
        destination: '/sitemap-index.xml',
      },
    ];
  },
};

export default nextConfig;