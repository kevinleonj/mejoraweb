import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const CONSENT_KEY = 'mejoraweb-cookie-consent'

export default function CookieBanner({ onOpenCookies }) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem(CONSENT_KEY) === null
  })

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className='cookie-banner' role='region' aria-label={t('cookie.title')}>
      <div className='cookie-banner-card'>
        <div className='cookie-banner-header'>
          <span className='cookie-banner-icon' aria-hidden='true'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5'/>
              <path d='M8.5 8.5v.01'/><path d='M16 15.5v.01'/><path d='M12 12v.01'/><path d='M11 17v.01'/><path d='M7 14v.01'/>
            </svg>
          </span>
          <span className='cookie-banner-title'>{t('cookie.title')}</span>
        </div>
        <p className='cookie-banner-desc'>
          {t('cookie.text')}{' '}
          <button
            className='cookie-policy-link'
            onClick={onOpenCookies}
            type='button'
          >
            {t('cookie.policyLink')}
          </button>
          .
        </p>
        <div className='cookie-banner-actions'>
          <button
            className='cookie-btn cookie-btn--ghost'
            onClick={() => setConsent('rejected')}
            type='button'
          >
            {t('cookie.reject')}
          </button>
          <button
            className='cookie-btn cookie-btn--outline'
            onClick={() => setConsent('minimal')}
            type='button'
          >
            {t('cookie.minimal')}
          </button>
          <button
            className='cookie-btn cookie-btn--primary'
            onClick={() => setConsent('accepted')}
            type='button'
          >
            {t('cookie.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
