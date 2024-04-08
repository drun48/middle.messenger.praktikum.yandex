import { defineConfig } from 'vite'

export default defineConfig({
    base:'./',
    root: '.',
    build: {
        outDir: 'dist'
    },
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    }
})