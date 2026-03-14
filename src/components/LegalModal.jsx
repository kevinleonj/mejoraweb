import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function LegalModal({ type, onClose }) {
  const { t } = useLanguage()

  const title = t(`legal.${type}.title`)
  const sections = t(`legal.${type}.sections`)

  // Lock scroll and handle ESC
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className='modal-overlay'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={title}
    >
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <button
            className='modal-close'
            onClick={onClose}
            aria-label={t('lang') === 'es' ? 'Cerrar' : 'Close'}
          >
            ✕
          </button>
        </div>
        <div className='modal-content'>
          {Array.isArray(sections) &&
            sections.map((section, i) => (
              <div key={i} className='modal-section'>
                <h3 className='modal-section-heading'>{section.heading}</h3>
                <p className='modal-section-body'>{section.body}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
