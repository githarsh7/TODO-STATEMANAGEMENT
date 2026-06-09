import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../slices/todoSlice'
import TodoCard from './TodoCard'

const FILTERS = [
  { value: 'All',           label: '🌌 All' },
  { value: 'Not Completed', label: '🔴 In Progress' },
  { value: 'Completed',     label: '🟢 Completed' },
]

const Main = ({ todos, filter, isLoading, updateStatus, editTodo, deleteTodo }) => {
  const dispatch = useDispatch()

  if (isLoading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <div className="loading-txt">Retrieving Mission Data -</div>
      </div>
    )
  }

  return (
    <>
      {/* SET FILTER */}
      <div className="filter-bar">
        <span className="filter-lbl">Filter :</span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`fpill${filter === f.value ? ' active' : ''}`}
            onClick={() => dispatch(setFilter(f.value))}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Todo list */}
      {todos.length === 0 ? (
        <div className="empty-wrap">
          <div className="empty-icon">🌌</div>
          <div className="empty-title">No Missions Detected!</div>
          <div className="empty-sub">
            {filter === 'All'
              ? 'Deploy your first mission above to get started'
              : 'No missions match this filter'}
          </div>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              updateStatus={updateStatus}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Main
