import { GITHUB_USER, SHOW_PHONE, contactEmail, ghFile, ghProfile } from './site'

export type Lang = 'fr' | 'en'

// Disponibilité : à ajuster ICI, la valeur est reprise dans le hero, « À propos », le contact et le profil JSON.
// (Penser aussi à la ligne <meta name="description"> de index.html, lue par les robots sans JavaScript.)
const START = {
  fr: { long: 'dès que possible', short: 'Dès que possible', status: 'Ouvert à l\'alternance et au stage' },
  en: { long: 'as soon as possible', short: 'ASAP', status: 'Open to apprenticeship and internship' },
}

type Cert = { name: string; org?: string }

// Organismes renseignés uniquement quand ils figurent dans le README ; pas de dates inventées.
const CERTS: readonly Cert[] = [
  { name: 'Fortinet Certified Associate', org: 'Fortinet' },
  { name: 'Fortinet Certified Fundamentals', org: 'Fortinet' },
  { name: 'CCNA', org: 'Cisco' },
  { name: 'Junior Cybersecurity Analyst', org: 'Cisco' },
  { name: 'Six Sigma Yellow Belt' },
  { name: 'Scrum Fundamental' },
  { name: 'PRINCE2' },
]

type ContactLink = { icon: string; label: string; val: string; href: string }

const contactLinks = (phoneLabel: string): ContactLink[] => [
  { icon: '✉️', label: 'Email', val: contactEmail(), href: `mailto:${contactEmail()}` },
  ...(SHOW_PHONE ? [{ icon: '📞', label: phoneLabel, val: '+33 7 54 75 97 52', href: 'tel:+33754759752' }] : []),
  {
    icon: '💬',
    label: 'WhatsApp',
    val: 'Écrire sur WhatsApp',
    href: 'https://wa.me/message/55RMWPSTXTGCM1',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    val: 'jules-oscar-olsenick-mbekal',
    href: 'https://www.linkedin.com/in/jules-oscar-olsenick-mbekal-771a84267/',
  },
  ...(GITHUB_USER ? [{ icon: '⌥', label: 'GitHub', val: GITHUB_USER, href: ghProfile() }] : []),
]

export const content = {
  fr: {
    meta: {
      title: 'Jules Oscar MBEKAL — Cybersécurité · Audit SI · GRC',
      description: `Jules Oscar MBEKAL — Analyste cybersécurité, audit SI, GRC, gouvernance IT et gestion des risques. Alternance 12 mois à partir de septembre 2026 ou stage 6 mois à partir de novembre 2026.`,
    },
    nav: [
      { label: 'Accueil', id: 'hero' },
      { label: 'À propos', id: 'about' },
      { label: 'Compétences', id: 'skills' },
      { label: 'Expérience', id: 'experience' },
      { label: 'Projets', id: 'projects' },
      { label: 'Formation', id: 'education' },
      { label: 'Contact', id: 'contact' },
    ],
    brand: 'MBEKAL',
    brandSuffix: '.sec',
    contactCta: 'Me contacter',
    navLabel: 'Navigation principale',
    skipLabel: 'Aller au contenu',
    hello: 'Bonjour, je suis',
    firstName: 'Jules Oscar',
    lastName: 'MBEKAL',
    roleLine: 'Analyste Cybersécurité',
    roleSub: 'Audit SI · GRC · Gouvernance IT · Gestion des risques',
    heroLead:
      'Mon parcours combine une approche technique de la cybersécurité, réseaux, systèmes, SOC, gestion des vulnérabilités, pentest et durcissement avec une orientation croissante vers la GRC, l\'audit IT, la gestion des risques et la gouvernance de la sécurité.',
    heroAvailability:
      'Alternance 12 mois à partir de septembre 2026 — Rythme : 3 semaines entreprise / 1 semaine école\nou stage de 6 mois à partir de novembre 2026.',
    seeProjects: 'Voir mes projets',
    toolsLabel: 'Outils & référentiels',
    tools: [
      { name: 'EBIOS RM', icon: '◎' },
      { name: 'ISO 27001', icon: '⬡' },
      { name: 'Wazuh', icon: '▣' },
      { name: 'OpenVAS', icon: '◈' },
      { name: 'Docker', icon: '⬡' },
      { name: 'Python', icon: '⌘' },
    ],
    available: 'Ouvert à l\'alternance',
    badgeSecondary: 'Sept. 2026 · 3 sem. / 1 sem.',
    aboutLabel: 'À propos',
    aboutTitleBefore: 'Une cybersécurité ',
    aboutTitleAccent: 'business, risques, technique',
    aboutSub: '',
    stats: [
      { value: '905', label: 'TOEIC / 990 · anglais C1', href: '/portfolio/documents/TOEIC-Oscar.pdf' },
      { value: '4', label: 'Expériences pro', href: '' },
      { value: '100+', label: 'Étudiants sensibilisés OSINT', href: '' },
      { value: '7', label: 'Certifications', href: '' },
    ],
    aboutP1:
      'Mon parcours combine une approche technique de la cybersécurité réseaux, systèmes, SOC, gestion des vulnérabilités, pentest et durcissement avec une orientation croissante vers la GRC, l\'audit IT, la gestion des risques et la gouvernance de la sécurité.',
    aboutP2:
      'Je vise des postes d\'auditeur SSI junior, assistant RSSI, assistant chef de projet sécurité / GRC ou analyste risk management.',
    tags: ['France', 'Alternance 12 mois', 'Stage 6 mois', '3 sem. entreprise / 1 sem. école'],
    langsTitle: 'Langues',
    langs: ['Français — langue maternelle', 'Anglais — C1, TOEIC 905/990'],
    toeicProof: { label: 'Voir le justificatif TOEIC', href: '/portfolio/documents/TOEIC-Oscar.pdf' },
    visionTitle: 'Trois dimensions indissociables',
    vision: [
      { title: 'Business', desc: 'Aligner la sécurité sur les enjeux métier, la conformité et la décision.' },
      { title: 'Risques', desc: 'Prioriser par l\'analyse (EBIOS RM), les écarts et les plans d\'amélioration.' },
      { title: 'Technique', desc: 'SOC, vulnérabilités, durcissement, IAM et monitoring pour rendre la GRC opérationnelle.' },
    ],
    profileJson: `{
  "name": "Jules Oscar MBEKAL",
  "role": "Cybersecurity Analyst",
  "focus": [
    "IT Audit",
    "GRC",
    "Risk Management"
  ],
  "languages": "FR native · EN C1",
  "toeic": 905,
  "status": "${START.fr.status}"
}`,
    certsLabel: 'Certifications',
    certs: CERTS,
    skillsLabel: 'Compétences',
    skillsTitleBefore: 'Mon ',
    skillsTitleAccent: 'socle',
    skillsSub: 'Audit & GRC, sécurité opérationnelle, infrastructure et sensibilisation.',
    skillGroups: [
      {
        title: 'Audit & GRC',
        items: ['EBIOS RM', 'ISO 27001', 'ISO 27002', 'ISO 27005', 'NIS2', 'GRC', 'IT Audit', 'TPRM'],
      },
      {
        title: 'Sécurité opérationnelle',
        items: ['Wazuh', 'Splunk', 'OpenVAS', 'Nessus', 'OSINT', 'SOC'],
      },
      {
        title: 'Infrastructure & automatisation',
        items: ['Python', 'PowerShell', 'Bash', 'Linux', 'Windows Server', 'Docker', 'VMware', 'Fortinet'],
      },
    ],
    awareness: 'Animation d\'ateliers de sensibilisation à la cybersécurité.',
    expLabel: 'Expérience',
    expTitleBefore: 'Mon ',
    expTitleAccent: 'parcours professionnel',
    impact: 'Impacts clés',
    experience: [
      {
        period: 'Janvier 2026 – Juin 2026',
        role: 'Ingénieur chercheur en cybersécurité',
        co: 'ICAM Nantes',
        desc: 'Conception et orchestration d\'une plateforme OSINT multi-sources (+7 outils), dashboard d\'analyse de données alimenté par l\'IA (filtres avancés, visualisation), déploiement et sécurisation de l\'infrastructure (Docker, cloud, monitoring, MFA/2FA, chiffrement, IAM, logging).',
        impacts: [
          'Optimisation globale des méthodes de veille et de recherche en cybersécurité (offensive et défensive)',
          'Sensibilisation et montée en compétences de plus de 100 étudiants sur les enjeux OSINT',
        ],
        skills: ['OSINT', 'IA', 'Docker', 'IAM', 'Monitoring'],
        link: { label: 'Voir le projet', href: '/portfolio/video/Sentinel.mp4' },
      },
      {
        period: 'Août 2024 – Janvier 2025',
        role: 'Assistant Sécurité SI',
        co: 'Wafacash Central Africa',
        desc: 'Analyses de risques multisites (EBIOS RM) sur l\'ensemble du réseau d\'agences, identification des écarts et plans d\'amélioration pour la mise à jour de la PSSI, dispositifs de surveillance, contrôle de conformité et reporting direction, copilotage de la mise à jour du SI (8 serveurs, 150+ postes impactés).',
        impacts: [
          'Modernisation des outils métiers et réduction des délais de traitement opérationnels',
          'Priorisation des actions de sécurisation et renforcement de la conformité globale du SI',
        ],
        skills: ['EBIOS RM', 'GRC', 'PSSI', 'KPI', 'Pilotage'],
        link: null,
      },
      {
        period: 'Janvier 2024 – Mars 2024',
        role: 'Ingénieur cybersécurité junior',
        co: 'Wise Computers',
        desc: 'Dashboard OpenVAS pour la gestion des vulnérabilités d\'un parc de 80 machines, tests d\'intrusion grey box avec correction directe, SOC analyst (surveillance, analyse des alertes, réponse aux incidents), KPI de sécurité, procédures et ateliers de sensibilisation.',
        impacts: [
          'Réduction de 30 % du délai moyen de remédiation des vulnérabilités (de 5 à 2 jours)',
          'Élimination des vulnérabilités critiques du parc informatique',
        ],
        skills: ['OpenVAS', 'SOC', 'Pentest', 'Remédiation'],
        link: null,
      },
      {
        period: 'Avril 2023 – Juin 2023',
        role: 'Assistance support',
        co: 'Numtek',
        desc: 'Support utilisateurs, Active Directory, serveur de fichiers et portail captif pour l\'authentification des employés.',
        impacts: [],
        skills: ['Active Directory', 'Support', 'Portail captif'],
        link: null,
      },
    ],
    projectsLabel: 'Projets',
    projectsTitleBefore: 'Mes ',
    projectsTitleAccent: 'réalisations',
    projectsSub: 'IoT, annuaire, architecture réseau.',
    projects: [
      {
        tag: 'IoT · IA',
        title: 'Wi_Grow — agriculture connectée au Cameroun',
        desc: 'Plateforme technologique de suivi agricole combinant capteurs sol, imagerie drone et détection IA de maladies/nuisibles, présenté au salon ETSIA.',
        tech: ['IoT', 'Drones', 'IA', 'Vision par ordinateur'],
        color: '#8B5CF6',
        link: { label: 'Voir le projet', href: '/portfolio/documents/WI_grow (1).pdf' },
      },
      {
        tag: 'Infra',
        title: 'Projet d\'annuaire et Supervision',
        desc: 'Mise en place et supervision d\'une architecture d\'annuaire reposant sur Active Directory : installation d\'un contrôleur sous Windows Server, création des GPO, supervision des serveurs à l\'aide de Centreon, mise en place d\'un réseau MPLS multisites.',
        tech: ['Active Directory', 'Windows Server', 'GPO', 'Centreon', 'MPLS'],
        color: '#C45CC0',
        link: null,
      },
      {
        tag: 'Réseau',
        title: 'YANSNET — Architecture Réseau & Infra Applicative',
        desc: 'Conception de l\'infrastructure système, réseau et télécom destinée à supporter un réseau social étudiant. Ingénierie de l\'interconnexion sécurisée entre les cités universitaires et le campus principal.',
        tech: ['Architecture', 'Réseau', 'Sécurité', 'Télécom'],
        color: '#06B6D4',
        link: null,
      },
    ],
    eduLabel: 'Formation',
    eduTitleBefore: 'Mon ',
    eduTitleAccent: 'cursus',
    education: [
      {
        period: '2026 – 2027',
        school: 'Université de Technologie de Troyes (UTT)',
        program: 'Mastère Spécialisé® Audit de la Sécurité des SI',
      },
      {
        period: '2021 – 2026',
        school: 'ICAM',
        program: 'Ingénieur en informatique, spécialisation Réseau & Cybersécurité (Bac+5)',
      },
    ],
    beyondLabel: 'Au-delà de la cyber',
    beyondTitle: 'Autres engagements',
    beyond: [
      {
        title: 'DJing & Event Tech',
        desc: 'Solutions technologiques pour simplifier l\'organisation événementielle et la relation artistes / clients.',
      },
      {
        title: 'Entrepreneuriat & Tech en Afrique',
        desc: 'Prototypage de solutions adaptées aux enjeux du continent (agriculture connectée, cybersécurité, services numériques).',
      },
    ],
    contactLabel: 'Contact',
    contactTitleBefore: 'Travaillons ',
    contactTitleAccent: 'ensemble',
    contactSub:
      'Alternance 12 mois à partir de septembre 2026 (rythme 3 sem. / 1 sem.) ou stage 6 mois à partir de novembre 2026 — Auditeur SSI junior · Assistant RSSI · Assistant chef de projet sécurité / GRC · Analyste risk management.',
    links: contactLinks('Téléphone'),
    formName: 'Nom complet',
    formEmail: 'Email',
    formMessage: 'Message',
    formPhName: 'Votre nom',
    formPhEmail: 'vous@entreprise.com',
    formPhMessage: 'Décrivez l\'opportunité ou le besoin…',
    formSend: 'Envoyer le message →',
    formSentTitle: 'Message prêt',
    formSent: 'Votre client mail va s\'ouvrir. Sinon, écrivez-moi directement.',
    footerLeft: '© 2026 Jules Oscar MBEKAL',
    footerRight: 'Audit · GRC · Risques · Disponible',
    photoAlt: 'Jules Oscar MBEKAL — Analyste cybersécurité',
  },
  en: {
    meta: {
      title: 'Jules Oscar MBEKAL — Cybersecurity · IT Audit · GRC',
      description: `Jules Oscar MBEKAL — Cybersecurity analyst, IT audit, GRC, IT governance and risk management. 12-month apprenticeship from September 2026 or 6-month internship from November 2026.`,
    },
    nav: [
      { label: 'Home', id: 'hero' },
      { label: 'About', id: 'about' },
      { label: 'Skills', id: 'skills' },
      { label: 'Experience', id: 'experience' },
      { label: 'Projects', id: 'projects' },
      { label: 'Education', id: 'education' },
      { label: 'Contact', id: 'contact' },
    ],
    brand: 'MBEKAL',
    brandSuffix: '.sec',
    contactCta: 'Contact me',
    navLabel: 'Main navigation',
    skipLabel: 'Skip to content',
    hello: 'Hello, I am',
    firstName: 'Jules Oscar',
    lastName: 'MBEKAL',
    roleLine: 'Cybersecurity Analyst',
    roleSub: 'IT Audit · GRC · IT Governance · Risk Management',
    heroLead:
      'My background combines a technical approach to cybersecurity — networks, systems, SOC, vulnerability management, pentesting and hardening — with a growing focus on GRC, IT audit, risk management and security governance.',
    heroAvailability:
      '12-month apprenticeship from September 2026 — 3 weeks company / 1 week school\nor 6-month internship from November 2026.',
    seeProjects: 'View projects',
    toolsLabel: 'Tools & frameworks',
    tools: [
      { name: 'EBIOS RM', icon: '◎' },
      { name: 'ISO 27001', icon: '⬡' },
      { name: 'Wazuh', icon: '▣' },
      { name: 'OpenVAS', icon: '◈' },
      { name: 'Docker', icon: '⬡' },
      { name: 'Python', icon: '⌘' },
    ],
    available: 'Open to apprenticeship',
    badgeSecondary: 'Sept. 2026 · 3 weeks / 1 week',
    aboutLabel: 'About',
    aboutTitleBefore: 'Cybersecurity through ',
    aboutTitleAccent: 'business, risk, technology',
    aboutSub: '',
    stats: [
      { value: '905', label: 'TOEIC / 990 · English C1', href: '/portfolio/documents/TOEIC-Oscar.pdf' },
      { value: '4', label: 'Professional roles', href: '' },
      { value: '100+', label: 'Students trained on OSINT', href: '' },
      { value: '7', label: 'Certifications', href: '' },
    ],
    aboutP1:
      'My background combines a technical approach to cybersecurity — networks, systems, SOC, vulnerability management, pentesting and hardening — with a growing focus on GRC, IT audit, risk management and security governance.',
    aboutP2:
      'I am targeting roles such as junior IT security auditor, assistant CISO, assistant security/GRC project manager or risk management analyst.',
    tags: ['France', '12-month apprenticeship', '6-month internship', '3 weeks company / 1 week school'],
    langsTitle: 'Languages',
    langs: ['French — native', 'English — C1, TOEIC 905/990'],
    toeicProof: { label: 'View TOEIC score report', href: '/portfolio/documents/TOEIC-Oscar.pdf' },
    visionTitle: 'Three inseparable dimensions',
    vision: [
      { title: 'Business', desc: 'Align security with business priorities, compliance and decision-making.' },
      { title: 'Risk', desc: 'Prioritize through analysis (EBIOS RM), gap assessments and improvement plans.' },
      { title: 'Technology', desc: 'SOC, vulnerabilities, hardening, IAM and monitoring to make GRC operational.' },
    ],
    profileJson: `{
  "name": "Jules Oscar MBEKAL",
  "role": "Cybersecurity Analyst",
  "focus": [
    "IT Audit",
    "GRC",
    "Risk Management"
  ],
  "languages": "FR native · EN C1",
  "toeic": 905,
  "status": "${START.en.status}"
}`,
    certsLabel: 'Certifications',
    certs: CERTS,
    skillsLabel: 'Skills',
    skillsTitleBefore: 'My technical ',
    skillsTitleAccent: 'stack',
    skillsSub: 'Audit & GRC, operational security, infrastructure and awareness training.',
    skillGroups: [
      {
        title: 'Audit & GRC',
        items: ['EBIOS RM', 'ISO 27001', 'ISO 27002', 'ISO 27005', 'NIS2', 'GRC', 'IT Audit', 'TPRM'],
      },
      {
        title: 'Operational security',
        items: ['Wazuh', 'Splunk', 'OpenVAS', 'Nessus', 'OSINT', 'SOC'],
      },
      {
        title: 'Infrastructure & automation',
        items: ['Python', 'PowerShell', 'Bash', 'Linux', 'Windows Server', 'Docker', 'VMware', 'Fortinet'],
      },
    ],
    awareness: 'Running cybersecurity awareness workshops.',
    expLabel: 'Experience',
    expTitleBefore: 'My ',
    expTitleAccent: 'professional path',
    impact: 'Key impact',
    experience: [
      {
        period: 'January 2026 – June 2026',
        role: 'Cybersecurity Research Engineer',
        co: 'ICAM Nantes',
        desc: 'Designed and orchestrated a multi-source OSINT platform (+7 tools), built an AI-powered data analysis dashboard (advanced filters, visualization), deployed and secured the infrastructure (Docker, cloud, monitoring, MFA/2FA, encryption, IAM, logging).',
        impacts: [
          'Overall improvement of cybersecurity monitoring and research methods (offensive and defensive)',
          'Raised awareness and upskilled more than 100 students on OSINT topics',
        ],
        skills: ['OSINT', 'AI', 'Docker', 'IAM', 'Monitoring'],
        link: { label: 'View the project', href: '/portfolio/video/Sentinel.mp4' },
      },
      {
        period: 'August 2024 – January 2025',
        role: 'IT Security Assistant',
        co: 'Wafacash Central Africa',
        desc: 'Multi-site EBIOS RM risk analyses across the whole branch network, gap identification and improvement plans to update the security policy (PSSI), monitoring, compliance controls and management reporting, co-led the IS update project (8 servers, 150+ workstations impacted).',
        impacts: [
          'Modernized business tools and reduced operational processing times',
          'Prioritized security actions and strengthened overall IS compliance',
        ],
        skills: ['EBIOS RM', 'GRC', 'PSSI', 'KPIs', 'Delivery'],
        link: null,
      },
      {
        period: 'January 2024 – March 2024',
        role: 'Junior Cybersecurity Engineer',
        co: 'Wise Computers',
        desc: 'OpenVAS dashboard for vulnerability management across an 80-machine fleet, grey-box penetration tests with direct remediation, SOC analyst work (monitoring, alert analysis, incident response), security KPIs, procedures and awareness workshops.',
        impacts: [
          'Reduced average vulnerability remediation time by 30% (from 5 to 2 days)',
          'Eliminated critical vulnerabilities across the IT fleet',
        ],
        skills: ['OpenVAS', 'SOC', 'Pentest', 'Remediation'],
        link: null,
      },
      {
        period: 'April 2023 – June 2023',
        role: 'IT Support Assistant',
        co: 'Numtek',
        desc: 'End-user support, Active Directory, file server and captive portal for employee authentication.',
        impacts: [],
        skills: ['Active Directory', 'Support', 'Captive portal'],
        link: null,
      },
    ],
    projectsLabel: 'Projects',
    projectsTitleBefore: 'Selected ',
    projectsTitleAccent: 'work',
    projectsSub: 'IoT, directory services and network architecture.',
    projects: [
      {
        tag: 'IoT · AI',
        title: 'Wi_Grow — connected agriculture in Cameroon',
        desc: 'Agricultural monitoring platform combining soil sensors, drone imagery and AI disease/pest detection. Presented at ETSIA.',
        tech: ['IoT', 'Drones', 'AI', 'Computer vision'],
        color: '#8B5CF6',
        link: { label: 'View the project', href: '/portfolio/documents/WI_grow (1).pdf' },
      },
      {
        tag: 'Infra',
        title: 'Directory & Monitoring project',
        desc: 'Setup of a directory architecture based on Active Directory: domain controller on Windows Server, GPO creation, server monitoring with Centreon, multi-site MPLS network.',
        tech: ['Active Directory', 'Windows Server', 'GPO', 'Centreon', 'MPLS'],
        color: '#C45CC0',
        link: null,
      },
      {
        tag: 'Network',
        title: 'YANSNET — Network & Application Infrastructure',
        desc: 'Design of the system, network and telecom infrastructure for a student social network. Secure interconnection engineering between student residences and the main campus.',
        tech: ['Architecture', 'Network', 'Security', 'Telecom'],
        color: '#06B6D4',
        link: null,
      },
    ],
    eduLabel: 'Education',
    eduTitleBefore: 'Academic ',
    eduTitleAccent: 'path',
    education: [
      {
        period: '2026 – 2027',
        school: 'Université de Technologie de Troyes (UTT)',
        program: 'Specialized Master\'s® in Information Systems Security Auditing',
      },
      {
        period: '2021 – 2026',
        school: 'ICAM',
        program: 'Engineering degree in Computer Science, Network & Cybersecurity (Bac+5)',
      },
    ],
    beyondLabel: 'Beyond cybersecurity',
    beyondTitle: 'Other work',
    beyond: [
      {
        title: 'DJing & Event Tech',
        desc: 'Tech solutions to simplify event organization and the artist/client relationship.',
      },
      {
        title: 'Entrepreneurship & tech in Africa',
        desc: 'Prototyping solutions for the continent\'s challenges (connected agriculture, cybersecurity, digital services).',
      },
    ],
    contactLabel: 'Contact',
    contactTitleBefore: 'Let\'s work ',
    contactTitleAccent: 'together',
    contactSub:
      '12-month apprenticeship from September 2026 (3 weeks / 1 week) or 6-month internship from November 2026 — Junior IT security auditor · Assistant CISO · Assistant security/GRC project manager · Risk management analyst.',
    links: contactLinks('Phone'),
    formName: 'Full name',
    formEmail: 'Email',
    formMessage: 'Message',
    formPhName: 'Your name',
    formPhEmail: 'you@company.com',
    formPhMessage: 'Describe the opportunity or need…',
    formSend: 'Send message →',
    formSentTitle: 'Message ready',
    formSent: 'Your mail client should open. Otherwise, email me directly.',
    footerLeft: '© 2026 Jules Oscar MBEKAL',
    footerRight: 'Audit · GRC · Risk · Available',
    photoAlt: 'Jules Oscar MBEKAL — Cybersecurity analyst',
  },
} as const
