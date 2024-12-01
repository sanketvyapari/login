import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

const ButtonToggle = ({
  className,
  selectedValue,
  startValue,
  selectStart,
  selectEnd,
  startButtonTitle,
  endButtonTitle,
}) => {
  const [startSelected, setStartSelected] = useState(false)

  useEffect(() => {
    setStartSelected(selectedValue === startValue)
  }, [selectedValue])

  const selectedBtn = 'bg-blue-500 text-white'
  const defaultBtn = 'bg-white text-black'
  const startPosition = { top: '11px', left: '20px' }
  const endPosition = { top: '11px', right: '20px' }

  const selectStartButton = useCallback(
    (e) => {
      setStartSelected(true)
      selectStart()
    },
    [setStartSelected, selectStart]
  )

  const selectEndButton = useCallback(
    (e) => {
      setStartSelected(false)
      selectEnd()
    },
    [setStartSelected, selectEnd]
  )

  return (
    <div className={className}>
      <div
        className={`flex-1 p-3 text-center cursor-pointer ${
          startSelected ? selectedBtn : defaultBtn
        }`}
        onClick={() => selectStartButton()}
      >
        {startButtonTitle}
      </div>
      <div className="flex-1 px-5 py-4 relative">
        <div className="object-none object-center w-full h-full bg-white rounded-lg">
          {' '}
        </div>
        <div
          className="absolute bg-blue-500 rounded-full top-10 left-10 w-6 h-6 cursor-pointer"
          style={startSelected ? startPosition : endPosition}
        ></div>
      </div>
      <div
        className={`flex-1 p-3 text-center cursor-pointer ${
          startSelected ? defaultBtn : selectedBtn
        }`}
        onClick={() => selectEndButton()}
      >
        {endButtonTitle}
      </div>
    </div>
  )
}

ButtonToggle.propTypes = {
  selectedValue: PropTypes.string,
  className: PropTypes.string,
  startValue: PropTypes.string,
  startButtonTitle: PropTypes.string,
  endButtonTitle: PropTypes.string,
  selectStart: PropTypes.func,
  selectEnd: PropTypes.func,
}

export default ButtonToggle
