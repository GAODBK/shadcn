/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // 优化mantine组件库, 防止
        // [webpack.cache.PackFileCacheStrategy] Serializing big strings (145kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    sassOptions: {
        // silenceDeprecations: ['legacy-js-api'],
        silenceDeprecations: ['modern'],
    }
};

export default nextConfig;
