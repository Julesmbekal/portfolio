# Portfolio — Jules Oscar MBEKAL

Site personnel (FR/EN) pour une recherche d’alternance cybersécurité / audit SI / GRC.

## Développement

```bash
npm install
npm run dev
```

## Où modifier quoi

| Sujet | Fichier |
| --- | --- |
| Textes FR/EN, expériences, projets, certifications | `src/content.ts` |
| Disponibilité (« dès que possible », etc.) | constante `START` en haut de `src/content.ts` |
| Liens vers vidéo Sentinel, PDF Wi_Grow, justificatif TOEIC, profil GitHub | `src/site.ts` (renseigner `GITHUB_USER`) |
| Meta description / Open Graph lus sans JavaScript (aperçus de lien) | `index.html` |
| Afficher le téléphone (masqué par défaut) | `SHOW_PHONE` dans `src/site.ts` |
| CSP, `robots.txt`, `sitemap.xml`, fichier `_headers` | plugin `siteMeta` dans `vite.config.ts` |

Tant que `GITHUB_USER` est vide dans `src/site.ts`, les liens GitHub sont masqués.

## Mise en ligne (GitHub Pages)

1. Créer un dépôt GitHub vide, puis depuis ce dossier :

   ```bash
   git add .
   git commit -m "Portfolio initial"
   git branch -M main
   git remote add origin https://github.com/<utilisateur>/<depot>.git
   git push -u origin main
   ```

2. Dans GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`
   (suivi dans l’onglet **Actions**). `base` Vite est `./`, ce qui fonctionne en site de projet comme en site utilisateur.

Build local :

```bash
npm run build
```

`canonical`, `og:url`, `og:image` et `sitemap.xml` ont besoin de l'URL publique. Le workflow la fournit tout seul ; en local :

```powershell
$env:SITE_URL="https://<utilisateur>.github.io/<depot>"; npm run build
```

## Sécurité

- Aucune ressource externe : polices auto-hébergées (`@fontsource`), aucun script tiers. Une CSP stricte est injectée en `<meta>` au build.
- GitHub Pages ne permet pas de définir des en-têtes HTTP. Pour les obtenir (CSP complète avec `frame-ancestors`, HSTS,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`…), héberger sur **Cloudflare Pages** ou **Netlify** :
  le fichier `dist/_headers` généré au build est repris tel quel. Vérification : https://securityheaders.com
