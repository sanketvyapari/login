import { useContext, useEffect } from 'react'
import { NavContext } from '../../context/global_context'
import ErrorCard from '../../components/common/ErrorCard'

const LoginSuccess = () => {
  const [state, dispatch] = useContext(NavContext)
  useEffect(() => {
    dispatch({
      type: 'header',
      data: {
        header: 'Logged In',
        sub_header: 'You can change content from here.',
        id: '',
        show_back_btn: false,
        dtc_details: {},
        back_btn_url: '',
        full_width_container: false,
      },
    })
  }, [])
  return (
    <div className="flex-grow flex  justify-center  text-2xl mx-auto container text-white">
      <div
        className="flex justify-center bg-tracer-dark-blue mt-20 w-3/4 p-20"
      >
        <div>
          <div className="font-bold text-5xl">
            Logged In Successfully
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSuccess
