import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

     eslint: {
    ignoreDuringBuilds: true, 
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);