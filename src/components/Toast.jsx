import React, { useEffect, useState } from 'react'

const ICONS = { success: '✅', error: '❌', info: 'ℹ️' }

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const show = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }

  return { toasts, show }
}

const Toast = ({ toasts }) => (
  <div className="toast-wrap">
    {toasts.map((t) => (
      <div key={t.id} className={`toast ${t.type}`}>
        <span className="toast-icon">{ICONS[t.type]}</span>
        {t.message}
      </div>
    ))}
  </div>
)

export default Toast
