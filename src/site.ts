// Renseigne GITHUB_USER pour activer les liens vers tes justificatifs hébergés sur GitHub.
// Tant que GITHUB_USER est vide, les fichiers sont servis en local depuis le dossier /public.

export const GITHUB_USER = 'Julesmbekal'
export const GITHUB_PROFILE_REPO = GITHUB_USER // dépôt du README de profil (même nom que l'identifiant)
export const GITHUB_BRANCH = 'main'

export const ghProfile = (): string => (GITHUB_USER ? `https://github.com/${GITHUB_USER}` : '')

// Si GITHUB_USER est renseigné → lien GitHub ; sinon → fichier local depuis /public (BASE_URL inclus via vite).
// Place tes fichiers dans public/documents/ et public/video/ pour que les liens locaux fonctionnent.
export const ghFile = (path: string): string =>
  GITHUB_USER
    ? `https://github.com/${GITHUB_USER}/${GITHUB_PROFILE_REPO}/blob/${GITHUB_BRANCH}/${path}`
    : `/${path}`

// Coordonnées publiques -----------------------------------------------------------------
// Le téléphone est masqué par défaut (démarchage / spam). Passer à true pour l'afficher.
export const SHOW_PHONE = true

// Adresse assemblée à l'exécution : elle n'apparaît pas en clair dans le bundle.
// (Dissuade uniquement les collecteurs naïfs ; l'adresse reste visible pour les visiteurs.)
const EMAIL_PARTS = ['Olsenick.mbekal', 'gmail.com']
export const contactEmail = (): string => EMAIL_PARTS.join('@')
