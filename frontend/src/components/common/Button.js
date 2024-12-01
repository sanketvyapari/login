import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const { className, style, text, onClick } = props

  return (
    <>
      <input
        type="submit"
        className={`cursor-pointer ${className}`}
        style={style}
        onClick={(e) => onClick(e)}
        value={text}
      />
    </>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
