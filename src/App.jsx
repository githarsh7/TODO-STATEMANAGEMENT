import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getTodo, addTodo, updateStatus, editTodo, deleteTodo } from './slices/todoSlice'
import Stars  from './components/Stars'
import Header from './components/Header'
import Main   from './components/Main'
import Toast, { useToast } from './components/Toast'

const API = '/statemanagetodos'

const App = () => {
  const dispatch = useDispatch()
  const todos  = useSelector((state) => state.todo.todos)
  const filter = useSelector((state) => state.todo.filter)

  const [isLoading, setIsLoading] = useState(false)
  const [addBusy,   setAddBusy]   = useState(false)
  const { toasts, show } = useToast()

  const totalDone    = todos.filter((t) => t.status === 'Completed').length
  const totalPending = todos.filter((t) => t.status !== 'Completed').length

  const filteredTodos = todos.filter((t) =>
    filter === 'All' ? true : t.status === filter
  )

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(API)
      dispatch(getTodo(res.data))
    } catch (err) {
      console.error(err)
      show('Failed to load missions', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodoHandler = async (todoData) => {
    if (!todoData.name.trim()) return
    try {
      setAddBusy(true)
      const res = await axios.post(API, {
        todoName: todoData.name,
        todoDesc: todoData.desc,
        status:   'Not Completed',
      })
      dispatch(addTodo(res.data))
      show('Mission deployed! 🚀', 'success')
    } catch (err) {
      console.error(err)
      show('Failed to deploy mission', 'error')
    } finally {
      setAddBusy(false)
    }
  }

  const updateStatusHandler = async (todoData) => {
    try {
      dispatch(updateStatus(todoData))
      await axios.put(`${API}/${todoData.todoId}`, {
        status: todoData.todoStatus,
      })
      show(
        todoData.todoStatus === 'Completed'
          ? 'Mission complete! 🟢'
          : 'Mission reactivated 🔴',
        'success'
      )
    } catch (err) {
      console.error(err)
      show('Status update failed', 'error')
    }
  }

  const editTodoHandler = async (todoData) => {
    try {
      dispatch(editTodo(todoData))
      await axios.put(`${API}/${todoData.todoId}`, {
        todoName: todoData.newName,
        todoDesc: todoData.newDesc,
      })
      show('Mission updated ✎', 'info')
    } catch (err) {
      console.error(err)
      show('Edit failed', 'error')
    }
  }

  const deleteTodoHandler = async (todoId) => {
    try {
      dispatch(deleteTodo(todoId))
      await axios.delete(`${API}/${todoId}`)
      show('Mission aborted 🗑', 'info')
    } catch (err) {
      console.error(err)
      show('Delete failed', 'error')
    }
  }

  useEffect(() => { fetchTodos() }, [])

  return (
    <div className="app-shell">
      <Stars />

      <header className="app-header">
        <div className="hdr-orb">🚀</div>
        <div>
          <div className="hdr-title">MISSION CONTROL</div>
          <div className="hdr-sub">Redux Toolkit — Space Todo</div>
        </div>
        <div className="hdr-status">
          <span className="pulse-dot" />
          <span>SYSTEMS ONLINE</span>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat-cell">
          <div className="stat-num sky">{todos.length}</div>
          <div className="stat-lbl">~ Total Missions</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num grn">{totalDone}</div>
          <div className="stat-lbl">Completed!!!</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num org">{totalPending}</div>
          <div className="stat-lbl">In Progress!</div>
        </div>
      </div>

      <div className="main-panel">
        <Header addTodo={addTodoHandler} loading={addBusy} />
        <Main
          todos={filteredTodos}
          filter={filter}
          isLoading={isLoading}
          updateStatus={updateStatusHandler}
          editTodo={editTodoHandler}
          deleteTodo={deleteTodoHandler}
        />
      </div>

      <footer className="app-footer">
        © Starbase Systems — Redux Toolkit — State Management
      </footer>

      <Toast toasts={toasts} />
    </div>
  )
}

export default App