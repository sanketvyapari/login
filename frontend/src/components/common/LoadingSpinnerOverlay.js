import React from 'react'
import PropTypes from 'prop-types'
import LoadingOverlay from 'react-loading-overlay'

// TODO: Try to move it into layout to have one component for whole application
const LoadingSpinnerOverlay = ({ active, text, children }) => {
  return (
    <>
      {active && (
        <div
          className="w-full h-full fixed block top-0 left-0 bg-white z-50"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <span
            className="text-green-500 top-1/2 my-0 mx-auto block relative w-0 h-0"
            style={{ top: '50%', width: 'auto' }}
          >
            <LoadingOverlay
              active
              spinner
              text={text || 'Loading...'}
              styles={{ content: '' }}
            >
              {children}
            </LoadingOverlay>
          </span>
        </div>
      )}
    </>
  )
}

LoadingSpinnerOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
}

export default LoadingSpinnerOverlay
