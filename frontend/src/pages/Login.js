import { Navigate, useSearchParams } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants/common'
import { postRequest } from '../services/base'
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../utils/LocalStorageAccess'
import { useContext, useEffect, useState } from 'react'
import { NavContext } from '../context/global_context'

const Login = () => {
  const [value, dispatch] = useContext(NavContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isRedirect, setIsRedirect] = useState(null)

  useEffect(() => {
    dispatch({ type: 'header', data: { show_back_btn: false } })
    redirectToAuthenticate()
  }, [])

  const redirectToAuthenticate = () => {
    if (getLocalStorageData(AUTH_TOKEN)) {
      if (!searchParams.get('next')) {
        setIsRedirect('/login_success')
      } else {
        setIsRedirect(searchParams.get('next'))
      }
    }
  }

  const submitLogin = async (event) => {
    event.preventDefault()
    let data = new FormData(event.target)
    let res = await postRequest('/api_auth/', data)
    if (res.token) {
      dispatch({
        type: 'notification',
        data: { notification_type: 'suceess', msg: 'Login Successfully done!' },
      })
      setLocalStorageData(AUTH_TOKEN, res.token)
      setTimeout(function () {
        if (!searchParams.get('next')) {
          return window.location.reload()
        } else {
          return (window.location.href = `${searchParams.get('next')}`)
        }
      }, 1000)
    } else {
      alert(res.msg)
    }
  }

  return isRedirect ? (
    <Navigate to={isRedirect} />
  ) : (
    <div className="flex-grow flex mx-auto container">
      <div className="flex justify-center bg-grey-lighter pt-12">
        <div className="items-center">
          <div className="text-left bg-tracer-dark-blue p-8 rounded">
            <h2 className="text-white">LOG IN</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                submitLogin(e)
              }}
              method="POST"
            >
              <input type="hidden" name="authenticity_token" value="" />
              <div className="field space-y-3">
                <label className="pb-2 text-white" htmlFor="user_email">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  autoFocus="autoFocus"
                  autoComplete="email"
                  className="text-base h-10 px-5 pr-5 rounded focus:outline-none"
                  name="email"
                  id="user_email"
                />
              </div>
              <div className="field space-y-3">
                <label className="text-white" htmlFor="user_password">
                  Password
                </label>
                <br />
                <input
                  autoComplete="current-password"
                  className="text-base h-10 px-5 pr-5 rounded focus:outline-none"
                  type="password"
                  name="password"
                  id="user_password"
                />
              </div>
              <div className="field text-white">
                <input name="user[remember_me]" type="hidden" value="0" />
                <input
                  type="checkbox"
                  value="1"
                  name="user[remember_me]"
                  id="user_remember_me"
                />
                <label className="pl-2" htmlFor="user_remember_me">
                  Remember me
                </label>
              </div>
              <div className="actions">
                <input
                  type="submit"
                  name="commit"
                  value="Log in"
                  className="btn"
                  data-disable-with="Log in"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
