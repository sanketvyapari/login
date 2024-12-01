import { useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NavContext } from '../context/global_context'
import { isAuth } from '../utils/auth'
import { getRequest } from '../services/base'
import MenuHistoryBackButton from './common/MenuHistoryBackButton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  deleteLocalStorage,
  setLocalStorageData,
} from '../utils/LocalStorageAccess'
import { AUTH_TOKEN, MAKE_ID } from '../constants/common'
import { ProgresSpinner } from './common/ProgresSpinner'

const ADMIN_HOST = [
  'localhost:3000',
]

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, dispatch] = useContext(NavContext)

  useEffect(() => {
    if (!isAuth) {
      if (location.pathname !== '/logout_success') {
        getCognitoRedirect()
      }
    } else {
      checkUserAuth()
    }
  }, [])

  useEffect(() => {
    if (value?.notification?.notification_type) {
      notify(value?.notification?.msg, value?.notification?.notification_type)
    } else if (value?.notification instanceof Array) {
      value?.notification.forEach((notification_row) => {
        notify(notification_row?.msg, notification_row?.notification_type)
      })
    }
  }, [value])

  const checkUserAuth = async () => {
    let res = await getRequest(`/api/ping/`)
    if (res?.msg === 'ok') {
      setLocalStorageData(MAKE_ID, res?.make)
    }
    if (res?.msg === 'ok' && location.pathname === '/') {
      window.location.href = '/vehicles'
    } else if (res?.msg === 'Not authorized') {
      callLogoutApi()
    }
  }

  const getCognitoRedirect = async () => {
    dispatch({
      type: 'loader',
      data: {
        caption: 'Wait!, We are validating login..',
        showLoader: true,
      },
      notification: {},
    })
    let res = await getRequest(`/generate_auth_redirect_url/`, false)

    dispatch({
      type: 'notification',
      data: {},
    })
    if (res?.redirect_url && location.pathname !== '/auth') {
      window.location.href = res?.redirect_url
    } else if (
      res?.msg ===
        'Oops! Something went wrong, You are not authorised to access' &&
      location.pathname !== '/not_permitted'
    ) {
      window.location.href = '/not_permitted'
    } else {
      if (
        ![
          '/users/sign_in',
          '/auth',
          '/not_permitted',
          '/logout_success',
        ].includes(location.pathname)
      ) {
        window.location.href = '/users/sign_in'
      }
    }
  }

  const Logout = (e) => {
    e.preventDefault()
    callLogoutApi()
  }

  const callLogoutApi = async () => {
    let res = await getRequest(`/logout/`)
    if (res.msg) {
      deleteLocalStorage(AUTH_TOKEN)
      deleteLocalStorage(MAKE_ID)
      dispatch({
        type: 'notification',
        data: {
          notification_type: 'suceess',
          msg: 'Logout Sucessfully done! We are redirecting you.',
        },
      })
      setTimeout(function () {
        window.location.href = '/logout_success'
      }, 1000)
    }
  }

  const notify = (msg, notification_type) => {
    toast(msg, { type: notification_type })
  }

  return (
    <>
      <ToastContainer />
      {value?.loader?.showLoader && (
        <div className="loading-overlay">
          <ProgresSpinner
            caption={
              value?.loader?.caption ? value?.loader?.caption : 'Loading'
            }
          />
        </div>
      )}

      <div className="bg-tracer-lt-blue px-4 py-2">
        <div className="container mx-auto">
          <div className="flex justify-between content-center items-center">
            <div className="header-section w-3/4">
              <div className="flex ">
                <div className="flex items-left items-center">
                  {value?.show_back_btn && (
                    <MenuHistoryBackButton
                      path=""
                      iconClass="h-8 w-8 bg-white bg-opacity-25 text-white cursor-pointer rounded"
                      onBack={() => {
                        value?.back_btn_url
                          ? navigate(value?.back_btn_url)
                          : navigate(-1)
                      }}
                    />
                  )}
                  <div className="pl-4">
                    {value?.header && (
                      <h1 className="text-white">{value?.header}</h1>
                    )}
                    {value?.sub_header && (
                      <h2 className="text-white font-semibold">
                        {value?.sub_header}
                      </h2>
                    )}
                  </div>
                </div>

                {value?.dtc_details?.length > 0 && (
                  <>
                    <div
                      className="py-2"
                      style={{ borderLeftWidth: '1px', borderColor: 'white' }}
                    >
                      &nbsp;
                    </div>

                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end header-section w-2/3">
              {isAuth ? (
                <>
                  <a
                    className="top-menu-session-link cursor-pointer"
                    onClick={(e) => {
                      Logout(e)
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <a
                  className="top-menu-session-link cursor-pointer"
                  href="/users/sign_in"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex-grow flex mx-auto ${
          value?.full_width_container ? '' : 'container'
        }`}
      >
        <Outlet />
      </div>
    </>
  )
}

export default Layout
