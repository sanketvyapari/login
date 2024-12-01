import * as React from 'react'

export function Tooltip({ message, position, children }) {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      <span
        style={show ? { visibility: 'unset' } : { visibility: 'hidden' }}
        className={`tooltip tooltip-${position}`}
      >
        {message}
        <span className={`tooltip-${position}`}></span>
      </span>
    </div>
  )
}

export default Tooltip
