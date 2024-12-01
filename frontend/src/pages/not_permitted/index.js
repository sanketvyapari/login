import { useContext, useEffect } from 'react'
import { NavContext } from '../../context/global_context'
import ErrorCard from '../../components/common/ErrorCard'

const NotPermitted = () => {
  const [state, dispatch] = useContext(NavContext)
  useEffect(() => {
    dispatch({ type: 'header', data: { show_back_btn: false } })
  }, [])
  return (
    <ErrorCard
      title={'Access Denied'}
      sub_title={'You are not authorised to access this portal!'}
    />
  )
}

export default NotPermitted
