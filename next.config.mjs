/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포 최적화 설정
  output: 'standalone',
  
  // 이미지 최적화
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [],
    minimumCacheTTL: 60,
  },
  
  // 성능 최적화
  swcMinify: true,
  
  // 정적 자산 최적화
  compress: true,
  
  // 실험적 기능
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  
  // 환경 변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 리다이렉트 설정 (필요시)
  async redirects() {
    return [];
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
