import { useContext, useEffect } from 'react'
import { NavContext } from '../../context/global_context'
import ErrorCard from '../../components/common/ErrorCard'

const LogoutSuccess = () => {
  const [state, dispatch] = useContext(NavContext)
  useEffect(() => {
    dispatch({ type: 'header', data: { show_back_btn: false } })
  }, [])

  return (
    <ErrorCard
      title={'Logged Out'}
      sub_title={'You have successfully logged out of the application!'}
    />
  )
}

export default LogoutSuccess
