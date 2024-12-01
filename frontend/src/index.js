import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import NoPage from './pages/NoPage'
import './global.css'
import Store from './context/global_context'
import Auth from './pages/auth'
import NotPermitted from './pages/not_permitted'
import LogoutSuccess from './pages/logout_success'
import LoginSuccess from './pages/login_success'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Store>
              <Layout />
            </Store>
          }
          key={'home'}
        >
          <Route path="users/sign_in" index element={<Login />} key={'login'} />
          <Route path={`auth/`} element={<Auth />} key={'auth'} />
          <Route
            path="not_permitted/"
            element={<NotPermitted />}
            key={'not_permitted'}
          />
          <Route
            path="logout_success/"
            element={<LogoutSuccess />}
            key={'logout_success'}
          />
          <Route
            path="login_success/"
            element={<LoginSuccess />}
            key={'login_success'}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
