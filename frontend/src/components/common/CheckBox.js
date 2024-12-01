import React from 'react'
import PropTypes from 'prop-types'

class CheckBox extends React.Component {
  initialState = {
    active: true,
  }

  render() {
    const { name, value, checked, onChange, sendFalse, falseName, falseValue } =
      this.props

    return (
      <label className="pretty-checkbox-label items-center flex space-x-5">
        <div
          className={`${checked && 'bg-tracer-lt-blue'} ${
            !checked && 'border border-gray-600'
          } rounded shadow w-4 h-4`}
        >
          <input
            name={name}
            type="checkbox"
            className="hidden"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {sendFalse && !checked && (
            <input type="hidden" name={falseName} value={falseValue} />
          )}
          <svg
            className="hidden w-4 h-4 text-white pointer-events-none"
            viewBox="0 5 172 172"
          >
            <g
              fill="none"
              strokeWidth="none"
              strokeMiterlimit="10"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: 'normal' }}
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </label>
    )
  }
}

CheckBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  sendFalse: PropTypes.bool,
  falseName: PropTypes.string,
  falseValue: PropTypes.any,
}

export default CheckBox
