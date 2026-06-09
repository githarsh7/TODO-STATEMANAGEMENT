import React, { useMemo } from 'react'

const Stars = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        id: i,
        top:   (Math.random() * 100).toFixed(2),
        left:  (Math.random() * 100).toFixed(2),
        size:  (Math.random() * 1.8 + 0.4).toFixed(2),
        dur:   (2 + Math.random() * 3).toFixed(2),
        delay: (Math.random() * 5).toFixed(2),
      })),
    []
  )

  return (
    <div className="stars-wrap">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top:    `${s.top}%`,
            left:   `${s.left}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            '--dur':   `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Stars
