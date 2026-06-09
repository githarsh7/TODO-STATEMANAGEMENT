import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import axios from 'axios'

axios.defaults.baseURL = 'https://6a1efcc0b79eec0d6cf063e4.mockapi.io'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)