import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        manifest: true,
        assetsDir: 'static',
        rollupOptions: {
          input: './src/client.tsx',
          output: {
            entryFileNames: 'static/client-[hash].js',
            manualChunks: {
              vendor: [
                'react',
                'react-dom',
              ]
            }
          },
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    }
  } else {
    return {
      plugins: [
        build(),
        devServer({
          adapter,
          entry: 'src/index.tsx'
        }),
      ],
      ssr: {
        external: ['react', 'react-dom'],
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    }
  }
})
