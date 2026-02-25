import { useEffect } from 'react'
import './css/style.css'
import LiquidEther from './components/LiquidEther/LiquidEther'

function App() {
  useEffect(() => {
    // Scroll-reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    // Header border on scroll
    const header = document.querySelector('.header')

    function onScroll() {
      const scrollY = window.scrollY
      if (scrollY > 80) {
        header.style.borderBottomColor = ''
      } else {
        header.style.borderBottomColor = 'transparent'
      }
    }

    // Throttle scroll events
    let ticking = false
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial state
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
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
        <nav className='header-inner'>
          <a href='/' className='logo' aria-label='mejoraweb - inicio'>
            mejoraweb
          </a>
          <span className='header-badge'>España</span>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className='hero' aria-labelledby='hero-heading'>
          <div className='container'>
            <p className='hero-kicker' data-animate=''>
              Auditoría y rediseño web profesional
            </p>
            <h1 id='hero-heading' className='hero-heading'>
              <span className='hero-line' data-animate='' data-delay='1'>
                El 73% de los consumidores
              </span>
              <span className='hero-line' data-animate='' data-delay='2'>
                juzga la credibilidad de un negocio
              </span>
              <span
                className='hero-line hero-line--accent'
                data-animate=''
                data-delay='3'
              >
                por el diseño de su web
              </span>
            </h1>
            <p className='hero-sub' data-animate='' data-delay='4'>
              Analizamos tu web actual. Identificamos cada problema. La
              reconstruimos con principios de diseño escandinavo para que
              trabaje por tu negocio, no en su contra.
            </p>
          </div>
        </section>

        {/* Problema */}
        <section className='section' aria-labelledby='problema-heading'>
          <div className='container'>
            <div className='section-label' data-animate=''>
              El problema
            </div>
            <h2
              id='problema-heading'
              className='section-heading'
              data-animate=''
            >
              Tu web trabaja contra ti
            </h2>
            <p className='section-text' data-animate=''>
              Cada dia, clientes potenciales buscan tu negocio en Google.
              Encuentran tu web. Y en menos de tres segundos, deciden si confían
              en ti o eligen a tu competencia.
            </p>

            <div className='grid-problems'>
              <article className='problem-card' data-animate='' data-delay='1'>
                <span className='problem-number'>40%</span>
                <h3 className='problem-title'>Sin versión móvil</h3>
                <p className='problem-desc'>
                  Más de la mitad del tráfico web en España viene del móvil. Una
                  web que no se adapta a pantallas pequeñas pierde la mayoría de
                  sus visitas antes de cargar.
                </p>
              </article>
              <article className='problem-card' data-animate='' data-delay='2'>
                <span className='problem-number'>53%</span>
                <h3 className='problem-title'>Carga lenta</h3>
                <p className='problem-desc'>
                  Si tu web tarda más de tres segundos en cargar, más de la
                  mitad de los visitantes la abandona. Google penaliza las webs
                  lentas en sus resultados de búsqueda.
                </p>
              </article>
              <article className='problem-card' data-animate='' data-delay='3'>
                <span className='problem-number'>84%</span>
                <h3 className='problem-title'>Sin certificado SSL</h3>
                <p className='problem-desc'>
                  Los navegadores marcan como "No seguro" las webs sin SSL. El
                  84% de los usuarios abandona una compra si percibe que el
                  sitio no es seguro.
                </p>
              </article>
              <article className='problem-card' data-animate='' data-delay='4'>
                <span className='problem-number'>94%</span>
                <h3 className='problem-title'>Diseño desactualizado</h3>
                <p className='problem-desc'>
                  Las primeras impresiones son casi enteramente de diseño. El
                  94% de las razones por las que los usuarios desconfian de una
                  web estan relacionadas con su aspecto visual.
                </p>
              </article>
            </div>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Servicio */}
        <section className='section' aria-labelledby='servicio-heading'>
          <div className='container'>
            <div className='section-label' data-animate=''>
              El servicio
            </div>
            <h2
              id='servicio-heading'
              className='section-heading'
              data-animate=''
            >
              Rediseño web integral
            </h2>
            <p className='section-text' data-animate=''>
              No construimos páginas web. Reconstruimos la presencia digital de
              tu negocio desde los cimientos.
            </p>

            <div className='services-grid'>
              <article className='service-block' data-animate='' data-delay='1'>
                <h3 className='service-title'>Auditoría técnica completa</h3>
                <p className='service-desc'>
                  Analizamos más de 40 puntos técnicos de tu web actual:
                  rendimiento, seguridad, accesibilidad, SEO, compatibilidad
                  móvil y experiencia de usuario. El diagnóstico es preciso. Sin
                  ambigüedades.
                </p>
              </article>
              <article className='service-block' data-animate='' data-delay='2'>
                <h3 className='service-title'>Diseño funcional escandinavo</h3>
                <p className='service-desc'>
                  Aplicamos principios del diseño nórdico: claridad,
                  funcionalidad y espacio. Cada elemento tiene un propósito. Lo
                  que no aporta valor al usuario, no existe. El resultado es una
                  web que comunica confianza desde el primer segundo.
                </p>
              </article>
              <article className='service-block' data-animate='' data-delay='3'>
                <h3 className='service-title'>Optimizacion para resultados</h3>
                <p className='service-desc'>
                  Una web rápida, segura y bien estructurada no es un lujo. Es
                  el estándar mínimo que Google exige para posicionarte.
                  Optimizamos para Core Web Vitals, motores de búsqueda clásicos
                  y los nuevos motores de búsqueda con inteligencia artificial.
                </p>
              </article>
            </div>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Proceso */}
        <section className='section' aria-labelledby='proceso-heading'>
          <div className='container'>
            <div className='section-label' data-animate=''>
              El proceso
            </div>
            <h2
              id='proceso-heading'
              className='section-heading'
              data-animate=''
            >
              Cuatro fases. Sin sorpresas.
            </h2>
            <p className='section-text' data-animate=''>
              Cada proyecto sigue una metodología estructurada. Sabes que ocurre
              en cada momento.
            </p>

            <ol className='process-list'>
              <li className='process-step' data-animate='' data-delay='1'>
                <span className='step-number'>01</span>
                <div className='step-content'>
                  <h3 className='step-title'>Auditoría</h3>
                  <p className='step-desc'>
                    Evaluamos tu web actual con herramientas profesionales de
                    análisis. Identificamos cada problema técnico y de diseño.
                    Recibes un informe detallado con prioridades claras y
                    métricas comparativas frente a tu competencia directa.
                  </p>
                </div>
              </li>
              <li className='process-step' data-animate='' data-delay='2'>
                <span className='step-number'>02</span>
                <div className='step-content'>
                  <h3 className='step-title'>Estrategia</h3>
                  <p className='step-desc'>
                    Definimos la arquitectura de información, el contenido y la
                    experiencia de usuario de tu nueva web. Cada decisión de
                    diseño esta respaldada por datos de uso real y mejores
                    prácticas del sector.
                  </p>
                </div>
              </li>
              <li className='process-step' data-animate='' data-delay='3'>
                <span className='step-number'>03</span>
                <div className='step-content'>
                  <h3 className='step-title'>Diseño y desarrollo</h3>
                  <p className='step-desc'>
                    Construimos tu web con tecnología moderna, optimizada para
                    velocidad de carga y posicionamiento en buscadores. Diseño
                    responsive que funciona con precisión en cualquier
                    dispositivo, desde un móvil hasta una pantalla de
                    escritorio.
                  </p>
                </div>
              </li>
              <li className='process-step' data-animate='' data-delay='4'>
                <span className='step-number'>04</span>
                <div className='step-content'>
                  <h3 className='step-title'>Lanzamiento</h3>
                  <p className='step-desc'>
                    Migramos tu dominio, configuramos la seguridad y
                    monitorizamos el rendimiento durante las primeras semanas.
                    Tu nueva web esta lista para trabajar por tu negocio desde
                    el primer dia.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <hr className='divider' aria-hidden='true' />

        {/* Equipo */}
        <section className='section' aria-labelledby='equipo-heading'>
          <div className='container'>
            <div className='section-label' data-animate=''>
              El equipo
            </div>
            <h2 id='equipo-heading' className='section-heading' data-animate=''>
              Un proyecto del Instituto de Empresa
            </h2>
            <p className='section-text' data-animate=''>
              mejoraweb nace en el Instituto de Empresa, una de las escuelas de
              negocios más reconocidas de Europa. Combinamos rigor académico con
              ejecución técnica.
            </p>

            <div className='team-grid'>
              <article className='team-member' data-animate='' data-delay='1'>
                <h3 className='member-name'>Kevin Leon</h3>
                <p className='member-role'>Ingeniería y diseño</p>
                <p className='member-bio'>
                  Ingeniero de software con sólida experiencia en entornos cloud
                  y proyectos tecnológicos en compañías de alto nivel.
                  Especialista en arquitectura web, sistemas escalables y
                  experiencia de usuario. Diseña y despliega soluciones
                  digitales robustas que combinan rendimiento, usabilidad y
                  visión estratégica.
                </p>
                <a
                  href='https://www.linkedin.com/in/kevinleonj/'
                  className='member-link'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Perfil de LinkedIn de Kevin Leon'
                >
                  linkedin.com/in/kevinleonj
                </a>
              </article>
              <article className='team-member' data-animate='' data-delay='2'>
                <h3 className='member-name'>Andres Ramirez</h3>
                <p className='member-role'>Estrategia, tecnología y negocio</p>
                <p className='member-bio'>
                  Estratega tecnológico con enfoque en crecimiento digital y
                  transformación para PYMEs. Combina análisis técnico,
                  desarrollo de software e implementación de IA para convertir
                  diagnósticos digitales en sistemas y productos que generan
                  impacto medible. Con experiencia en despliegue de aplicaciones
                  y optimización basada en datos.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='footer' role='contentinfo'>
        <div className='container'>
          <div className='footer-inner'>
            <span className='footer-logo'>mejoraweb</span>
            <span className='footer-location'>Madrid, España</span>
          </div>
          <p className='footer-legal'>Un proyecto del Instituto de Empresa.</p>
        </div>
      </footer>
    </>
  )
}

export default App
