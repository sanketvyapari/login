import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'
import LoadingSpinnerOverlay from './LoadingSpinnerOverlay'
import { useNavigate } from 'react-router-dom'

const LinkWithStatus = (props) => {
  const {
    href,
    className,
    style,
    title,
    confirmText,
    confirmTitle,
    onClickFunc,
  } = props

  const [active, activate] = useState(false)
  const navigate = useNavigate()

  const resolveOnClick = () => {
    activate(false)
    if (onClickFunc) {
      onClickFunc()
      activate(false)
    } else {
      navigate(href)
    }
  }

  useEffect(() => {
    if (active) {
      resolveOnClick()
    }
  }, [active])

  const onConfirm = () => {
    activate(true)
  }

  const onClose = () => {
    swal.close()
  }

  const showConfirmationAlert = () => {
    swal
      .fire({
        title: confirmTitle || 'Action confirmation',
        text: confirmText,
        focusConfirm: false,
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'rgb(245, 80, 80)',
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          onConfirm()
        } else if (result.dismiss === swal.DismissReason.cancel) {
          onClose()
        }
      })
  }

  const onClick = () => {
    if (confirmText) {
      showConfirmationAlert()
    } else {
      onConfirm()
    }
  }

  return (
    <>
      <span
        className={`cursor-pointer ${className}`}
        style={style}
        onClick={onClick}
      >
        {props.children || title}
      </span>
      <LoadingSpinnerOverlay active={active} />
    </>
  )
}

LinkWithStatus.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  confirmTitle: PropTypes.string,
  onClickFunc: PropTypes.func,
  children: PropTypes.any,
}

export default LinkWithStatus
