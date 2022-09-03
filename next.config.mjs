// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  env: {
    DEV_API: 'http://localhost:7777',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
    apiKey: "AIzaSyAalKuzJhRh_koZb6Y8wR1TV39jOLYBg-M",
    appId: "1:10681245570:web:924dfa255af1512742b99b",
    measurementId: "G-GM0Q7TMNBZ",
    TINY_MCE: 'jryhao1927sm7ir3qu4953xe0icxr5ro1zf2rvxij17z98x1',
    linkedin_client_id: '86dbkv8feornrn'
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
