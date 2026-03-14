import { useEffect, useState } from 'react'
import './css/style.css'
import LiquidEther from './components/LiquidEther/LiquidEther'
import LegalModal from './components/LegalModal'
import CookieBanner from './components/CookieBanner'
import CookieSettingsModal from './components/CookieSettingsModal'
import ContactForm from './components/ContactForm'
import ScrollToTop from './components/ScrollToTop'
import { useLanguage } from './context/LanguageContext'

function App() {
  const { t, lang, toggleLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [legalModal, setLegalModal] = useState(null) // null | 'privacy' | 'terms' | 'cookies'
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Smooth scroll to section and close mobile menu
  function navTo(id) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    // Scroll-reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('[data-animate]').forEach((el) => {
      revealObserver.observe(el)
    })

    // Active section observer for nav highlighting
    const sectionIds = ['servicios', 'proceso', 'equipo', 'contacto']
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    // Header scrolled state
    const header = document.querySelector('.header')
    let ticking = false
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            header.classList.add('header--scrolled')
          } else {
            header.classList.remove('header--scrolled')
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { id: 'servicios', label: t('header.services') },
    { id: 'proceso', label: t('header.process') },
    { id: 'equipo', label: t('header.team') },
    { id: 'contacto', label: t('header.contact') }
  ]

  const members = t('team.members')
  const problemCards = t('problems.cards')
  const serviceItems = t('services.items')
  const processSteps = t('process.steps')
  const year = new Date().getFullYear()

  return (
    <>
      {/* WebGL background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={true}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Header */}
      <header className='header' role='banner'>
        <nav className='header-inner' aria-label='Navegación principal'>
          <a
            href='/'
            className='logo'
            aria-label='mejoraweb — inicio'
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            mejoraweb
          </a>

          {/* Desktop nav */}
          <ul className='nav-links' role='list'>
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`nav-link${activeSection === id ? ' nav-link--active' : ''}`}
                  onClick={() => navTo(id)}
                  type='button'
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className='header-controls'>
            {/* Language toggle */}
            <button
              className='lang-toggle'
              onClick={toggleLang}
              type='button'
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
              <span className='lang-divider'>|</span>
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
            </button>

            {/* CTA button */}
            <button
              className='header-cta'
              onClick={() => navTo('contacto')}
              type='button'
            >
              {t('header.cta')}
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              type='button'
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            >
              <span className='hamburger-bar' />
              <span className='hamburger-bar' />
              <span className='hamburger-bar' />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className='mobile-menu' role='navigation' aria-label='Menú móvil'>
            <ul className='mobile-nav-links' role='list'>
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    className='mobile-nav-link'
                    onClick={() => navTo(id)}
                    type='button'
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className='mobile-menu-footer'>
              <button
                className='lang-toggle'
                onClick={toggleLang}
                type='button'
                aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
              >
                <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
                <span className='lang-divider'>|</span>
                <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
              </button>
              <button
                className='header-cta'
                onClick={() => navTo('contacto')}
                type='button'
              >
                {t('header.cta')}
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className='hero' id='inicio' aria-labelledby='hero-heading'>
          <div className='container'>
            <p className='hero-kicker' data-animate=''>
              {t('hero.kicker')}
            </p>
            <h1 id='hero-heading' className='hero-heading'>
              <span className='hero-line' data-animate='' data-delay='1'>
                {t('hero.line1')}
              </span>
              <span className='hero-line' data-animate='' data-delay='2'>
                {t('hero.line2')}
              </span>
              <span
                className='hero-line hero-line--accent'
                data-animate=''
                data-delay='3'
              >
                {t('hero.line3')}
              </span>
            </h1>
            <p className='hero-sub' data-animate='' data-delay='4'>
              {t('hero.sub')}
            </p>
            <div className='hero-actions' data-animate='' data-delay='5'>
              <button className='hero-cta' onClick={() => navTo('contacto')} type='button'>
                {t('header.cta')}
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M5 12h14M12 5l7 7-7 7'/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className='section' aria-labelledby='problema-heading'>
          <div className='container'>
            <div className='section-label' data-animate=''>
              {t('problems.label')}
            </div>
            <h2
              id='problema-heading'
              className='section-heading'
              data-animate=''
            >
              {t('problems.heading')}
            </h2>
            <p className='section-text' data-animate=''>
              {t('problems.text')}
            </p>
            <div className='grid-problems'>
              {Array.isArray(problemCards) &&
                problemCards.map((card, i) => (
                  <article
                    key={i}
                    className='problem-card'
                    data-animate=''
                    data-delay={String(i + 1)}
                  >
                    <span className='problem-number'>{card.stat}</span>
                    <h3 className='problem-title'>{card.title}</h3>
                    <p className='problem-desc'>{card.desc}</p>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Services */}
        <section
          className='section'
          id='servicios'
          aria-labelledby='servicio-heading'
        >
          <div className='container'>
            <div className='section-label' data-animate=''>
              {t('services.label')}
            </div>
            <h2
              id='servicio-heading'
              className='section-heading'
              data-animate=''
            >
              {t('services.heading')}
            </h2>
            <p className='section-text' data-animate=''>
              {t('services.text')}
            </p>
            <div className='services-grid'>
              {Array.isArray(serviceItems) &&
                serviceItems.map((item, i) => (
                  <article
                    key={i}
                    className='service-block'
                    data-animate=''
                    data-delay={String(i + 1)}
                  >
                    <h3 className='service-title'>{item.title}</h3>
                    <p className='service-desc'>{item.desc}</p>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Process */}
        <section
          className='section'
          id='proceso'
          aria-labelledby='proceso-heading'
        >
          <div className='container'>
            <div className='section-label' data-animate=''>
              {t('process.label')}
            </div>
            <h2
              id='proceso-heading'
              className='section-heading'
              data-animate=''
            >
              {t('process.heading')}
            </h2>
            <p className='section-text' data-animate=''>
              {t('process.text')}
            </p>
            <ol className='process-list'>
              {Array.isArray(processSteps) &&
                processSteps.map((step, i) => (
                  <li
                    key={i}
                    className='process-step'
                    data-animate=''
                    data-delay={String(i + 1)}
                  >
                    <span className='step-number'>{step.number}</span>
                    <div className='step-content'>
                      <h3 className='step-title'>{step.title}</h3>
                      <p className='step-desc'>{step.desc}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Team */}
        <section
          className='section'
          id='equipo'
          aria-labelledby='equipo-heading'
        >
          <div className='container'>
            <div className='section-label' data-animate=''>
              {t('team.label')}
            </div>
            <h2
              id='equipo-heading'
              className='section-heading'
              data-animate=''
            >
              {t('team.heading')}
            </h2>
            <p className='section-text' data-animate=''>
              {t('team.text')}
            </p>
            <div className='team-grid'>
              {Array.isArray(members) &&
                members.map((member, i) => (
                  <article
                    key={i}
                    className='team-member'
                    data-animate=''
                    data-delay={String(i + 1)}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className='member-photo'
                      width='72'
                      height='72'
                      loading='lazy'
                    />
                    <h3 className='member-name'>{member.name}</h3>
                    <p className='member-role'>{member.role}</p>
                    <p className='member-bio'>{member.bio}</p>
                    {member.linkedinUrl !== null && (
                      <div className='member-link-wrapper'>
                        <a
                          href={member.linkedinUrl}
                          className='member-link'
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`LinkedIn de ${member.name}`}
                        >
                          <svg className='linkedin-icon' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
                            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </article>
                ))}
            </div>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Contact */}
        <section
          className='section'
          id='contacto'
          aria-labelledby='contacto-heading'
        >
          <div className='container'>
            <div className='section-label' data-animate=''>
              {t('contact.label')}
            </div>
            <h2
              id='contacto-heading'
              className='section-heading'
              data-animate=''
            >
              {t('contact.heading')}
            </h2>
            <p className='section-text' data-animate=''>
              {t('contact.text')}
            </p>
            <div className='contact-card'>
              <ContactForm key={lang} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='footer' role='contentinfo'>
        <div className='container'>
          <div className='footer-grid'>
            {/* Brand column */}
            <div className='footer-brand'>
              <span className='footer-logo'>mejoraweb</span>
              <p className='footer-tagline'>{t('footer.tagline')}</p>
            </div>

            {/* Nav column */}
            <div className='footer-col'>
              <span className='footer-col-title'>{t('footer.navTitle')}</span>
              <ul className='footer-links' role='list'>
                {navLinks.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      className='footer-link'
                      onClick={() => navTo(id)}
                      type='button'
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal column */}
            <div className='footer-col'>
              <span className='footer-col-title'>{t('footer.legalTitle')}</span>
              <ul className='footer-links' role='list'>
                <li>
                  <button
                    className='footer-link'
                    onClick={() => setLegalModal('privacy')}
                    type='button'
                  >
                    {t('footer.privacy')}
                  </button>
                </li>
                <li>
                  <button
                    className='footer-link'
                    onClick={() => setLegalModal('terms')}
                    type='button'
                  >
                    {t('footer.terms')}
                  </button>
                </li>
                <li>
                  <button
                    className='footer-link'
                    onClick={() => setCookieSettingsOpen(true)}
                    type='button'
                  >
                    {t('footer.cookies')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className='footer-bottom'>
            <span className='footer-copyright'>
              {t('footer.copyright').replace('{year}', year)}
            </span>
            <a
              href='https://limeralda.com'
              className='footer-byline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('footer.byline')}
            </a>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      <CookieBanner onOpenCookies={() => setCookieSettingsOpen(true)} />

      {/* Cookie settings modal */}
      {cookieSettingsOpen && (
        <CookieSettingsModal
          onClose={() => setCookieSettingsOpen(false)}
          onOpenPolicy={() => { setCookieSettingsOpen(false); setLegalModal('cookies') }}
        />
      )}

      {/* Legal modals */}
      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}

      {/* Scroll to top */}
      <ScrollToTop />
    </>
  )
}

export default App
