import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'All',
  },
  reducers: {
    // Load all todos from API
    getTodo: (state, action) => {
      state.todos = action.payload
    },
    //  Add a new todo (optimistic — uses API response)
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
    },
    //  Update status (optimistic)
    updateStatus: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, status: action.payload.todoStatus }
          : todo
      )
    },
    //  Edit name + description (optimistic)
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              todoName: action.payload.newName,
              todoDesc: action.payload.newDesc,
            }
          : todo
      )
    },
    //  Delete a todo (optimistic)
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    //  Set filter: All | Completed | Not Completed
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const { getTodo, addTodo, updateStatus, editTodo, deleteTodo, setFilter } =
  todoSlice.actions

export default todoSlice.reducer
