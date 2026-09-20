import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { content, type Lang } from './content'
import { contactEmail } from './site'

const portrait = `${import.meta.env.BASE_URL}jules-oscar-mbekal.webp`

// localStorage peut lever une exception (navigation privée, stockage bloqué) : on ne casse jamais l'appli pour ça.
const readLang = (): Lang => {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}
const saveLang = (lang: Lang) => {
  try {
    localStorage.setItem('lang', lang)
  } catch {
    /* ignoré */
  }
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      role="group"
      aria-label="Langue / Language"
      style={{
        display: 'flex',
        borderRadius: '8px',
        border: '1px solid rgba(139,92,246,0.25)',
        overflow: 'hidden',
      }}
    >
      {(['fr', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          aria-label={code === 'fr' ? 'Français' : 'English'}
          onClick={() => setLang(code)}
          style={{
            padding: '6px 10px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            fontWeight: 600,
            background: lang === code ? 'rgba(139,92,246,0.35)' : 'transparent',
            color: lang === code ? '#F0EBF8' : 'var(--text-muted)',
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function GradientBtn({
  children,
  onClick,
  outline = false,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  outline?: boolean
  type?: 'button' | 'submit'
}) {
  const [hov, setHov] = useState(false)
  if (outline) {
    return (
      <button
        type={type}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: '12px 28px',
          borderRadius: '10px',
          border: '1.5px solid rgba(139,92,246,0.4)',
          background: hov ? 'rgba(139,92,246,0.1)' : 'transparent',
          color: hov ? '#fff' : 'rgba(240,235,248,0.8)',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '12px 28px',
        borderRadius: '10px',
        background: 'linear-gradient(90deg, #F97316 0%, #C45CC0 50%, #8B5CF6 100%)',
        color: '#fff',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 700,
        fontSize: '15px',
        cursor: 'pointer',
        border: 'none',
        boxShadow: hov ? '0 8px 32px rgba(249,115,22,0.4)' : '0 4px 16px rgba(249,115,22,0.2)',
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  )
}

function ProjectCard({
  project,
}: {
  project: {
    tag: string
    title: string
    desc: string
    tech: readonly string[]
    color: string
    link?: { label: string; href: string } | null
  }
}) {
  const [hov, setHov] = useState(false)
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        border: `1px solid ${hov ? project.color + '50' : 'rgba(139,92,246,0.15)'}`,
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.25s',
        boxShadow: hov ? `0 8px 32px ${project.color}18` : 'none',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '6px',
            background: project.color + '20',
            color: project.color,
            border: `1px solid ${project.color}40`,
          }}
        >
          {project.tag}
        </span>
      </div>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{project.title}</h3>
      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '16px' }}>{project.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              padding: '3px 8px',
              background: 'var(--bg-card)',
              borderRadius: '4px',
              color: 'var(--text-muted)',
              border: '1px solid rgba(139,92,246,0.12)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {project.link && project.link.href && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '18px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: project.color,
            textDecoration: 'none',
            borderBottom: `1px solid ${project.color}60`,
            paddingBottom: '2px',
          }}
        >
          {project.link.label} ↗
        </a>
      )}
    </article>
  )
}

function SectionHeading({ label, title, sub }: { label: string; title: ReactNode; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
      <div
        style={{
          display: 'inline-block',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          color: '#F97316',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '12px',
          padding: '4px 16px',
          borderRadius: '20px',
          background: 'rgba(249,115,22,0.08)',
          border: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          lineHeight: 1.15,
          marginBottom: '12px',
        }}
      >
        {title}
      </h2>
      {sub && (
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// Portrait flottant — réutilisé dans le hero
function Portrait({ alt }: { alt: string }) {
  return (
    <div className="anim-float" style={{ position: 'relative', width: '280px', height: '320px', flexShrink: 0 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          overflow: 'hidden',
          border: '2px solid rgba(139,92,246,0.3)',
          boxShadow: '0 0 60px rgba(139,92,246,0.2)',
          position: 'relative',
        }}
      >
        <img
          src={portrait}
          alt={alt}
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #0E0820, transparent)',
          }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readLang)
  const t = content[lang]
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    saveLang(lang)
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy : la section qui traverse le milieu de l'écran devient « active » dans le menu.
  useEffect(() => {
    const ids = t.nav.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [t])

  // Échap ferme le menu mobile.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    setMenuOpen(false)
    setActiveSection(id)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${formData.name} — portfolio`)
    const body = encodeURIComponent(`${formData.message}\n\n${formData.email}`)
    window.location.href = `mailto:${contactEmail()}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">
        {t.skipLabel}
      </a>
      <nav
        aria-label={t.navLabel}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(11,7,23,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.12)' : '1px solid transparent',
          transition: 'all 0.3s',
          gap: '16px',
        }}
      >
        <a
          href="#hero"
          aria-label={t.brand}
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #F97316, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            J
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F0EBF8' }}>
            {t.brand}
            <span
              style={{
                background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t.brandSuffix}
            </span>
          </span>
        </a>

        <div className="hidden-mobile" style={{ gap: '28px' }}>
          {t.nav.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollTo(n.id)}
              aria-current={activeSection === n.id ? 'true' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: activeSection === n.id ? '#F0EBF8' : 'var(--text-secondary)',
              }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LangSwitch lang={lang} setLang={setLang} />
          <div className="desktop-only">
            <GradientBtn onClick={() => scrollTo('contact')}>{t.contactCta}</GradientBtn>
          </div>
          <button
            type="button"
            className="mobile-only"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#F0EBF8',
              borderRadius: '8px',
              padding: '8px 10px',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-only"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(11,7,23,0.96)',
            flexDirection: 'column',
            padding: '16px 24px 24px',
            gap: '8px',
            borderBottom: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          {t.nav.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollTo(n.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#F0EBF8',
                textAlign: 'left',
                padding: '10px 0',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}

      <main id="main">
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '80px 32px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Blobs décoratifs */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                border: '1px solid rgba(139,92,246,0.15)',
                overflow: 'hidden',
                boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
                padding: '48px',
              }}
            >
              {/* En-tête de la carte */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #F97316, #8B5CF6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    ◎
                  </div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>CyberPortfolio</span>
                </div>
                {/* Badge disponibilité */}
                <div
                  style={{
                    background: 'rgba(22,15,38,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {t.available}
                  </span>
                </div>
              </div>

              {/* Zone principale : texte + photo côte à côte */}
              <div
                className="hero-main-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '48px',
                  marginBottom: '48px',
                }}
              >
                {/* Colonne texte */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 500,
                      fontSize: '22px',
                      marginBottom: '8px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t.hello}{' '}
                    <span
                      style={{
                        background: 'linear-gradient(90deg, #F97316, #C45CC0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                      }}
                    >
                      {t.firstName}
                    </span>
                  </p>
                  <h1
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                      lineHeight: 1.05,
                      marginBottom: '12px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {t.roleLine}
                  </h1>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: 500 }}>
                    {t.roleSub}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '12px' }}>
                    {t.heroLead}
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#A78BFA', maxWidth: '420px', marginBottom: '36px', fontStyle: 'italic' }}>
                    {t.heroAvailability}
                  </p>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <GradientBtn onClick={() => scrollTo('contact')}>{t.contactCta}</GradientBtn>
                    <GradientBtn outline onClick={() => scrollTo('projects')}>
                      {t.seeProjects}
                    </GradientBtn>
                  </div>
                </div>

                {/* Photo — à droite du titre "Analyste Cybersécurité", avant outils */}
                <div
                  className="hero-portrait-col"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    flexShrink: 0,
                  }}
                >
                  {/* Badge école */}
                  <div
                    style={{
                      background: 'rgba(22,15,38,0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(249,115,22,0.25)',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#F97316', marginBottom: '2px' }}>
                      UTT · ICAM
                    </div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 700 }}>{t.badgeSecondary}</div>
                  </div>

                  {/* Halo + portrait */}
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, transparent 70%)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                      }}
                    />
                    <Portrait alt={t.photoAlt} />
                  </div>
                </div>
              </div>

              {/* Outils & référentiels — sous le bloc texte+photo */}
              <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(139,92,246,0.12)' }}>
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '14px',
                  }}
                >
                  {t.toolsLabel}
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {t.tools.map((tool) => (
                    <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.75 }}>
                      <span style={{ fontSize: '14px' }}>{tool.icon}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── À PROPOS ─────────────────────────────────────────────────────── */}
        <section id="about" style={{ padding: '100px 32px', maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            label={t.aboutLabel}
            title={
              <>
                {t.aboutTitleBefore}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t.aboutTitleAccent}
                </span>
              </>
            }
            sub={t.aboutSub || undefined}
          />

          {/* Stats — TOEIC est cliquable */}
          <div className="stats-grid" style={{ gap: '20px', marginBottom: '60px' }}>
            {t.stats.map((s) => {
              const inner = (
                <>
                  <div
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 900,
                      fontSize: '2.6rem',
                      background: 'linear-gradient(135deg, #F97316, #8B5CF6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>{s.label}</div>
                </>
              )
              return s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(249,115,22,0.25)',
                    borderRadius: '16px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={s.label}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    borderRadius: '16px',
                    padding: '28px 20px',
                    textAlign: 'center',
                  }}
                >
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="two-col" style={{ gap: '32px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '16px' }}>{t.aboutP1}</p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '16px' }}>{t.aboutP2}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>{t.langsTitle}</p>
              <ul style={{ marginBottom: '24px', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
                {t.langs.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              {t.toeicProof.href && (
                <a
                  href={t.toeicProof.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    margin: '-12px 0 24px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#F97316',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(249,115,22,0.4)',
                  }}
                >
                  {t.toeicProof.label} ↗
                </a>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(139,92,246,0.2)',
                      color: 'var(--text-muted)',
                      background: 'rgba(139,92,246,0.06)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '16px', overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 16px',
                  borderBottom: '1px solid rgba(139,92,246,0.1)',
                  background: 'rgba(139,92,246,0.05)',
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  profile.json
                </span>
              </div>
              <pre
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  padding: '20px',
                  margin: 0,
                  overflowX: 'auto',
                }}
              >
                {t.profileJson}
              </pre>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '48px 0 20px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {t.visionTitle}
          </p>
          <div className="vision-grid" style={{ gap: '16px' }}>
            {t.vision.map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '60px', padding: '28px 0', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
              }}
            >
              {t.certsLabel}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {t.certs.map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    border: '1px solid rgba(139,92,246,0.15)',
                  }}
                >
                  <div style={{ width: '3px', height: '24px', borderRadius: '2px', background: 'linear-gradient(180deg, #F97316, #8B5CF6)' }} />
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px' }}>{c.name}</div>
                    {c.org && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.org}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMPÉTENCES ─────────────────────────────────────────────────── */}
        <section
          id="skills"
          style={{
            padding: '100px 32px',
            background: 'var(--bg-card)',
            borderTop: '1px solid rgba(139,92,246,0.08)',
            borderBottom: '1px solid rgba(139,92,246,0.08)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading
              label={t.skillsLabel}
              title={
                <>
                  {t.skillsTitleBefore}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t.skillsTitleAccent}
                  </span>
                </>
              }
              sub={t.skillsSub}
            />
            {t.skillGroups.map((g) => (
              <div key={g.title} style={{ marginBottom: '28px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>{g.title}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {g.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-muted)',
                        border: '1px solid rgba(139,92,246,0.15)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t.awareness}</p>
          </div>
        </section>

        {/* ─── EXPÉRIENCE ──────────────────────────────────────────────────── */}
        <section
          id="experience"
          style={{
            padding: '100px 32px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <SectionHeading
            label={t.expLabel}
            title={
              <>
                {t.expTitleBefore}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t.expTitleAccent}
                </span>
              </>
            }
          />
          <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'linear-gradient(180deg, #F97316, #8B5CF6)',
                opacity: 0.3,
              }}
            />
            {t.experience.map((exp) => (
              <div key={exp.co} style={{ paddingLeft: '32px', paddingBottom: '40px', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '4px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F97316, #8B5CF6)',
                    boxShadow: '0 0 8px rgba(249,115,22,0.5)',
                  }}
                />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#F97316', marginBottom: '6px' }}>
                  {exp.period}
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '22px', marginBottom: '2px' }}>{exp.role}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>@ {exp.co}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '12px' }}>{exp.desc}</p>
                {exp.impacts.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: '#A78BFA',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {t.impact}
                    </div>
                    <ul style={{ paddingLeft: '18px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {exp.impacts.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: exp.link ? '14px' : 0 }}>
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(139,92,246,0.15)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {exp.link && exp.link.href && (
                  <a
                    href={exp.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      color: '#F97316',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(249,115,22,0.4)',
                      paddingBottom: '2px',
                    }}
                  >
                    {exp.link.label} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROJETS ─────────────────────────────────────────────────────── */}
        <section
          id="projects"
          style={{
            padding: '100px 32px',
            background: 'var(--bg-card)',
            borderTop: '1px solid rgba(139,92,246,0.08)',
            borderBottom: '1px solid rgba(139,92,246,0.08)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading
              label={t.projectsLabel}
              title={
                <>
                  {t.projectsTitleBefore}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t.projectsTitleAccent}
                  </span>
                </>
              }
              sub={t.projectsSub}
            />
            <div className="two-col" style={{ gap: '20px' }}>
              {t.projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── FORMATION ───────────────────────────────────────────────────── */}
        <section id="education" style={{ padding: '100px 32px', maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            label={t.eduLabel}
            title={
              <>
                {t.eduTitleBefore}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t.eduTitleAccent}
                </span>
              </>
            }
          />
          <div style={{ maxWidth: '720px', margin: '0 auto 64px' }}>
            {t.education.map((ed) => (
              <div
                key={ed.school}
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(139,92,246,0.12)',
                }}
              >
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#F97316', marginBottom: '6px' }}>
                  {ed.period}
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '20px' }}>{ed.school}</div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>{ed.program}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '22px', textAlign: 'center', marginBottom: '24px' }}>
            {t.beyondTitle}
          </h3>
          <div className="two-col" style={{ gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {t.beyond.map((b) => (
              <div
                key={b.title}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, marginBottom: '8px' }}>{b.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CONTACT ─────────────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: '100px 32px', maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            label={t.contactLabel}
            title={
              <>
                {t.contactTitleBefore}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t.contactTitleAccent}
                </span>
              </>
            }
            sub={t.contactSub}
          />
          <div className="two-col" style={{ gap: '48px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {t.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(139,92,246,0.12)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', color: '#C45CC0' }}>{link.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>{link.label}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{link.val}</div>
                  </div>
                </a>
              ))}
            </div>

            {sent ? (
              <div
                role="status"
                aria-live="polite"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid rgba(34,197,94,0.25)',
                  padding: '40px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
                  {t.formSentTitle}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.formSent}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{t.formName}</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder={t.formPhName}
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(139,92,246,0.18)',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{t.formEmail}</label>
                  <input
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    required
                    placeholder={t.formPhEmail}
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(139,92,246,0.18)',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{t.formMessage}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t.formPhMessage}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(139,92,246,0.18)',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>
                <GradientBtn type="submit">{t.formSend}</GradientBtn>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer
        style={{
          padding: '24px 32px',
          borderTop: '1px solid rgba(139,92,246,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.footerLeft}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-muted)' }}>{t.footerRight}</span>
      </footer>
    </div>
  )
}
