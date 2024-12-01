import React from 'react'
import PropTypes from 'prop-types'

class FlashAlert extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(this.props.onClose, 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  bgClass = () => `bg-${this.props.bgColor}`

  borderClass = () => `border-${this.props.borderColor}`

  textClass = () => `text-${this.props.textColor}`

  render() {
    const { text, svgIcon, onClose } = this.props

    return(
      <div className='w-full'>
        <div
          className={`alert ${this.bgClass()} ${this.borderClass()} border-4 text-white px-10 py-5 rounded m-auto w-full`}
          role='alert'
        >
          <div className={`flex items-center ${this.textClass()} mr-5`}>
            <div className='py-1 w-1/12'>
              <svg
                className='fill-current h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                {svgIcon}
              </svg>
            </div>
            <span className='block sm:inline w-10/12'>{text}</span>
            <span
              className='block sm:inline underline ml-5 pr-8 w-1/12 float-right cursor-pointer'
              aria-label='Close'
              onClick={onClose}
            >
              Close
            </span>
          </div>
        </div>
      </div>
    )
  }
}

FlashAlert.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  svgIcon: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashAlert
