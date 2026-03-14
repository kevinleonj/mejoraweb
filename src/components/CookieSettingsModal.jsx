import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const CONSENT_KEY = 'mejoraweb-cookie-consent'

const STATUS_LABEL_KEY = {
  accepted: 'statusAccepted',
  minimal: 'statusMinimal',
  rejected: 'statusRejected',
}

export default function CookieSettingsModal({ onClose, onOpenPolicy }) {
  const { t } = useLanguage()
  const current = localStorage.getItem(CONSENT_KEY)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [onClose])

  function save(value) {
    localStorage.setItem(CONSENT_KEY, value)
    onClose()
  }

  const storageItems = t('cookie.storageItems')

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-panel'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label={t('cookie.settingsTitle')}
      >
        <div className='modal-header'>
          <div className='cookie-settings-header-inner'>
            <svg className='cookie-settings-icon' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
              <path d='M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5'/>
              <path d='M8.5 8.5v.01'/><path d='M16 15.5v.01'/><path d='M12 12v.01'/><path d='M11 17v.01'/><path d='M7 14v.01'/>
            </svg>
            <span className='modal-title'>{t('cookie.settingsTitle')}</span>
          </div>
          <button className='modal-close' onClick={onClose} type='button' aria-label='Cerrar'>×</button>
        </div>

        <div className='modal-content'>
          {current && (
            <div className='cookie-current-status'>
              <span className='cookie-current-label'>{t('cookie.currentStatus')}</span>
              <span className={`cookie-status-badge cookie-status-badge--${current}`}>
                {t(`cookie.${STATUS_LABEL_KEY[current] || 'statusRejected'}`)}
              </span>
            </div>
          )}

          <div>
            <p className='cookie-section-title'>{t('cookie.storageTitle')}</p>
            <div className='cookie-storage-list'>
              {Array.isArray(storageItems) && storageItems.map((item, i) => (
                <div key={i} className='cookie-storage-item'>
                  <div>
                    <code className='cookie-storage-key'>{item.key}</code>
                    <p className='cookie-storage-label'>{item.label}</p>
                  </div>
                  <span className='cookie-storage-badge'>{item.note}</span>
                </div>
              ))}
            </div>
          </div>

          <p className='modal-section-body'>{t('cookie.noTracking')}</p>

          <button className='cookie-policy-link' onClick={onOpenPolicy} type='button'>
            {t('cookie.viewPolicy')} →
          </button>
        </div>

        <div className='cookie-settings-footer'>
          <button className='cookie-btn cookie-btn--ghost' onClick={() => save('rejected')} type='button'>
            {t('cookie.reject')}
          </button>
          <button className='cookie-btn cookie-btn--outline' onClick={() => save('minimal')} type='button'>
            {t('cookie.minimal')}
          </button>
          <button className='cookie-btn cookie-btn--primary-full' onClick={() => save('accepted')} type='button'>
            {t('cookie.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
