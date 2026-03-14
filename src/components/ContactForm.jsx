import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactForm() {
  const { t } = useLanguage()

  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  function validate() {
    const e = {}
    if (!fields.name.trim()) e.name = t('contact.nameRequired')
    if (!fields.email.trim()) e.email = t('contact.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = t('contact.emailInvalid')
    if (!fields.message.trim()) e.message = t('contact.messageRequired')
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setErrors({})
    setStatus('sending')

    const workerUrl = import.meta.env.VITE_CONTACT_WORKER_URL
    try {
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim()
        })
      })
      if (!res.ok) throw new Error('Non-OK response')
      setStatus('success')
      setFields({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <form className='contact-form' onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className='form-success-banner'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><polyline points='20 6 9 17 4 12'/></svg>
          <p className='form-success-text'>{t('contact.successTitle')}</p>
        </div>
      )}
      <div className='form-row'>
        <div className='form-field'>
          <label className='form-label' htmlFor='contact-name'>
            {t('contact.name')}
          </label>
          <input
            id='contact-name'
            className={`form-input${errors.name ? ' form-input--error' : ''}`}
            type='text'
            name='name'
            value={fields.name}
            onChange={handleChange}
            placeholder={t('contact.namePlaceholder')}
            autoComplete='name'
          />
          {errors.name && <span className='form-error'>{errors.name}</span>}
        </div>
        <div className='form-field'>
          <label className='form-label' htmlFor='contact-email'>
            {t('contact.email')}
          </label>
          <input
            id='contact-email'
            className={`form-input${errors.email ? ' form-input--error' : ''}`}
            type='email'
            name='email'
            value={fields.email}
            onChange={handleChange}
            placeholder={t('contact.emailPlaceholder')}
            autoComplete='email'
          />
          {errors.email && <span className='form-error'>{errors.email}</span>}
        </div>
      </div>
      <div className='form-field'>
        <label className='form-label' htmlFor='contact-message'>
          {t('contact.message')}
        </label>
        <textarea
          id='contact-message'
          className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
          name='message'
          value={fields.message}
          onChange={handleChange}
          placeholder={t('contact.messagePlaceholder')}
          rows={5}
        />
        {errors.message && <span className='form-error'>{errors.message}</span>}
      </div>
      {status === 'error' && (
        <p className='form-error-global'>{t('contact.errorText')}</p>
      )}
      <button
        className='form-submit'
        type='submit'
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t('contact.sending') : t('contact.submit')}
        {status !== 'sending' && (
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><line x1='22' y1='2' x2='11' y2='13'/><polygon points='22 2 15 22 11 13 2 9 22 2'/></svg>
        )}
      </button>
    </form>
  )
}
