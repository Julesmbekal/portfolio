// Renseigne GITHUB_USER pour activer les liens vers tes justificatifs hébergés sur GitHub.
// Tant que GITHUB_USER est vide, les fichiers sont servis en local depuis le dossier /public.

export const GITHUB_USER = 'Julesmbekal'
export const GITHUB_PROFILE_REPO = GITHUB_USER // dépôt du README de profil (même nom que l'identifiant)
export const GITHUB_BRANCH = 'main'

// Si GITHUB_USER est renseigné → lien GitHub profil ; les fichiers assets sont servis
// directement depuis /public via la base Vite (pas via GitHub blob viewer).
export const ghProfile = (): string => (GITHUB_USER ? `https://github.com/${GITHUB_USER}` : '')

// Retourne un chemin vers un fichier dans public/ — servi par GitHub Pages sous /portfolio/
// BASE_URL est injecté par Vite à la compilation (/portfolio/ en prod, / en dev).
export const ghFile = (path: string): string => path

// Coordonnées publiques -----------------------------------------------------------------
// Le téléphone est masqué par défaut (démarchage / spam). Passer à true pour l'afficher.
export const SHOW_PHONE = true

// Adresse assemblée à l'exécution : elle n'apparaît pas en clair dans le bundle.
// (Dissuade uniquement les collecteurs naïfs ; l'adresse reste visible pour les visiteurs.)
const EMAIL_PARTS = ['Olsenick.mbekal', 'gmail.com']
export const contactEmail = (): string => EMAIL_PARTS.join('@')
