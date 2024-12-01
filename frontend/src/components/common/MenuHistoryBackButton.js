import React from 'react'
import PropTypes from 'prop-types'
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft'

class MenuHistoryBackButton extends React.Component {

  render() {
    return(
      <div>
        <svg
          className={`fill-current h-6 h-6 ${this.props.iconClass}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox='0 0 20 20'
          onClick={()=>{this.props.onBack()}}
        >
          <ChevronLeft />
        </svg>
      </div>
    )
  }
}

MenuHistoryBackButton.propTypes = {
  path: PropTypes.string,
  iconClass: PropTypes.string
}

export default MenuHistoryBackButton
