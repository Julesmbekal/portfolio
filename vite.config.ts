import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// URL publique du site (ex. https://utilisateur.github.io/depot). Renseignée automatiquement par le workflow GitHub ;
// en local : SITE_URL=https://... npm run build  (sert à canonical, og:url, og:image, sitemap).
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/+$/, '')

// Politique de sécurité du contenu : aucune ressource externe (polices auto-hébergées, aucun script tiers).
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // styles inline React
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

// Injecte la meta CSP (build uniquement, pour ne pas gêner le HMR en dev) et les balises dépendant de l'URL publique,
// puis émet robots.txt, sitemap.xml et un fichier _headers (Netlify / Cloudflare Pages ; ignoré par GitHub Pages).
function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        let meta = ''
        if (ctx.bundle) meta += `<meta http-equiv="Content-Security-Policy" content="${csp}" />\n    `
        if (siteUrl) {
          meta += [
            `<link rel="canonical" href="${siteUrl}/" />`,
            `<meta property="og:url" content="${siteUrl}/" />`,
            `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
            `<meta property="og:image:width" content="1200" />`,
            `<meta property="og:image:height" content="630" />`,
            `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
          ].join('\n    ')
        }
        return html.replace('<!--SITE_META-->', meta.trimEnd())
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
        })
      }
      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: [
          '/*',
          `  Content-Security-Policy: ${csp}; frame-ancestors 'none'`,
          '  Strict-Transport-Security: max-age=31536000',
          '  X-Content-Type-Options: nosniff',
          '  X-Frame-Options: DENY',
          '  Referrer-Policy: strict-origin-when-cross-origin',
          '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          '  Cross-Origin-Opener-Policy: same-origin',
          '',
          '/assets/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    // TypeScript d'abord : un fichier .js égaré à côté d'un .ts (sortie de tsc, outil tiers…) ne doit jamais le masquer.
    extensions: ['.tsx', '.ts', '.mts', '.jsx', '.mjs', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
