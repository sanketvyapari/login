import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAuth } from '../utils/auth'

const PrivateRoute = () => {
  return <>{isAuth ? <Outlet /> : <Navigate to="users/sign_in" />}</>
}

export default PrivateRoute
