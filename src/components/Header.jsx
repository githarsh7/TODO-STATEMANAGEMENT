import React, { useState } from 'react'

const Header = ({ addTodo, loading }) => {
  const [todoName, setTodoName] = useState('')
  const [todoDesc, setTodoDesc] = useState('')

  const handleSubmit = () => {
    if (!todoName.trim()) return
    addTodo({ name: todoName.trim(), desc: todoDesc.trim() })
    setTodoName('')
    setTodoDesc('')
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className="add-panel">
      <div className="panel-eyebrow">Deploy New Mission!</div>
      <div className="input-row">
        <input
          className="sp-input"
          type="text"
          placeholder="MISSION NAME -"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={handleKey}
        />
        <input
          className="sp-input"
          type="text"
          placeholder="MISSION OBJECTIVE -"
          value={todoDesc}
          onChange={(e) => setTodoDesc(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="launch-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : '⬆ LAUNCH'}
        </button>
      </div>
    </div>
  )
}

export default Header
