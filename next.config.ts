// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true, // ✅ 启用 styled-components 支持
    },
};

export default nextConfig;
