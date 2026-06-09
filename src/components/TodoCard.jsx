import React, { useState } from 'react'

const ICONS = ['🛸','🌍','🌑','☄️','🛰️','🌠','🔭','⚡','🌌','💫','🪐','🌟']

// Deterministic icon per todo id
const getIcon = (id) => {
  const n = String(id)
    .split('')
    .reduce((a, c) => a + c.charCodeAt(0), 0)
  return ICONS[n % ICONS.length]
}

// Mission code from id
const msnCode = (id) => 'MSN-' + String(id).slice(-5).toUpperCase().padStart(5, '0')

const TodoCard = ({ todo, updateStatus, editTodo, deleteTodo }) => {
  const [isEdit,   setIsEdit]   = useState(false)
  const [editName, setEditName] = useState(todo.todoName)
  const [editDesc, setEditDesc] = useState(todo.todoDesc)
  const [busy,     setBusy]     = useState(false)

  const isDone = todo.status === 'Completed'

  // UPDATE STATUS
  const handleStatusChange = async (e) => {
    setBusy(true)
    await updateStatus({ todoId: todo.id, todoStatus: e.target.value })
    setBusy(false)
  }

  // SAVE EDIT
  const handleSave = async () => {
    if (!editName.trim()) return
    setBusy(true)
    await editTodo({ todoId: todo.id, newName: editName.trim(), newDesc: editDesc.trim() })
    setIsEdit(false)
    setBusy(false)
  }

  const handleCancel = () => {
    setEditName(todo.todoName)
    setEditDesc(todo.todoDesc)
    setIsEdit(false)
  }

  // DELETE
  const handleDelete = async () => {
    setBusy(true)
    await deleteTodo(todo.id)
    // no setBusy(false) — card will unmount
  }

  return (
    <div className={`todo-card${isDone ? ' done' : ''}`}>
      {/* Top */}
      <div className="card-top">
        <div className="card-icon">{getIcon(todo.id)}</div>

        <div className="card-body">
          {isEdit ? (
            <div className="edit-row">
              <input
                className="edit-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Mission name -"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <input
                className="edit-input"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Mission objective -"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>
          ) : (
            <>
              <div className={`card-name${isDone ? ' struck' : ''}`}>{todo.todoName}</div>
              <div className="card-desc">{todo.todoDesc || '—'}</div>
            </>
          )}
          <div className="card-code">{msnCode(todo.id)}</div>
        </div>

        <span className={`sbadge ${isDone ? 'sbadge-done' : 'sbadge-active'}`}>
          {isDone ? '✓ DONE' : '◎ ACTIVE'}
        </span>
      </div>

      {/* Footer */}
      <div className="card-footer">
        {/* UPDATE STATUS dropdown */}
        <select
          className="sp-select"
          value={todo.status}
          onChange={handleStatusChange}
          disabled={busy}
        >
          <option value="Not Completed">🔴 In Progress!</option>
          <option value="Completed">🟢 Completed!!</option>
        </select>

        <div className="btn-group">
          {isEdit ? (
            <>
              {/* SAVE EDIT */}
              <button className="ic-btn save" title="Save" onClick={handleSave} disabled={busy}>✓</button>
              {/* Cancel edit */}
              <button className="ic-btn" title="Cancel" onClick={handleCancel}>✕</button>
            </>
          ) : (
            /* UPDATE EDIT */
            <button className="ic-btn" title="Edit mission" onClick={() => setIsEdit(true)} disabled={busy}>✎</button>
          )}
          {/* DELETE */}
          <button className="ic-btn del" title="Abort mission" onClick={handleDelete} disabled={busy}>🗑</button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard
