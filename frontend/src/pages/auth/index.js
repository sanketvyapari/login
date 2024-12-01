import { useEffect, useState } from 'react'
import { getRequest, postRequest } from '../../services/base'
import { useSearchParams } from 'react-router-dom'
import {
  deleteLocalStorage,
  setLocalStorageData,
} from '../../utils/LocalStorageAccess'
import { AUTH_TOKEN, MAKE_ID } from '../../constants/common'
import { isAuth } from '../../utils/auth'

const Auth = () => {
  const [error, setError] = useState('Authentication in progress...')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('code')) {
      generateToken(searchParams.get('code'))
    } else {
      getAuthUrl()
    }
  })

  const getAuthUrl = async () => {
    let res = await getRequest('/generate_auth_redirect_url/', isAuth)
    if (res?.redirect_url) {
      window.location.href = res.redirect_url
    } else {
      setError(res.msg)
      if (res.msg === 'We are redirecting to AT sign in page') {
        window.location.href = '/users/sign_in'
      } else {
        alert(res.msg)
      }
    }
  }

  const generateToken = async (code) => {
    let res = await postRequest('/generate_oauth_token/', { code: code })
    if (res?.success) {
      setLocalStorageData(AUTH_TOKEN, res.token)
      setLocalStorageData(MAKE_ID, res.make)
      window.location.href = '/vehicles'
    } else {
      deleteLocalStorage(AUTH_TOKEN)
      deleteLocalStorage(MAKE_ID)
    }
  }
  return (
    <div className="flex-grow flex  justify-center  text-2xl mx-auto container text-white">
      <div className="flex justify-center bg-grey-lighter">
        <div>{error}</div>
      </div>
    </div>
  )
}

export default Auth
