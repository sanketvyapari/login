import { useEffect, useRef, useState } from 'react'

const CustomDropDown = (props) => {
  const wrapperRef = useRef(null)
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowDropDown(false)
    }
  }

  return (
    <>
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <div
          className="btn py-1 px-2"
          style={{ position: 'relative' }}
          onClick={() => {
            setShowDropDown(true)
          }}
        >
          Plugin
        </div>
        {showDropDown && (
          <div
            className={'menu-option-wrapper '}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 0,
              width: '15vw',
            }}
          >
            <div
              className="px-1 py-1 menu-option cursor-pointer"
              onClick={() => {
                props.onClick('sales_code_complexity')
              }}
            >
              Sales Code Complexity Plugin
            </div>
            <div className={`menu-option-seperator`}></div>
            <div
              className="px-1 py-1 menu-option cursor-pointer"
              onClick={() => {
                props.onClick('def_plugin')
              }}
            >
              Def Plugin
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomDropDown
