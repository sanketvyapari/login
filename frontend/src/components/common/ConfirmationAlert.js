import { useEffect } from 'react'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const ConfirmationPopup = (props) => {
  const {
    confirmText,
    confirmTitle,
    onConfirm = function () {
      alert('onConfirm')
    },
    onClose = function () {
      alert('onClose')
    },
  } = props
  useEffect(() => {
    openPopup()
  }, [])
  const openPopup = () => {
    Swal.fire({
      title: confirmTitle || 'Action confirmation',
      text: confirmText,
      focusConfirm: false,
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'rgb(245, 80, 80)',
      allowOutsideClick: true,
    }).then((result) => {
      if (result.value) {
        onConfirm()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onClose()
      }
    })
  }

  return <></>
}

ConfirmationPopup.propTypes = {
  confirmTitle: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

export default ConfirmationPopup
