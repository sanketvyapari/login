import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MenuArrowOutline, Menu2Outline } from '@styled-icons/evaicons-outline'

const DropDownMenu = ({
  children,
  items,
  onClick = () => {},
  showMenu = false,
  outsideClickClose = false,
  width = null,
}) => {
  const wrapperRef = useRef(null)
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      outsideClickClose
    ) {
      setShowDropDown(false)
    }
  }

  useEffect(() => {
    setShowDropDown(showMenu)
  }, [showMenu])

  return (
    <>
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <div
          style={{ position: 'relative' }}
          onClick={() => {
            setShowDropDown(!showDropDown)
          }}
          className="cursor-pointer"
        >
          {children}
        </div>
        {showDropDown && (
          <div
            className={'menu-option-wrapper mt-1 py-1'}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 0,
              width: width ? width : '15vw',
            }}
          >
            {items?.map((item, index) => {
              return (
                <div key={`menu-${index}-${item.value}`}>
                  <div
                    className={`px-2  menu-option cursor-pointer  ${!item?.childrens?.length && 'menu-item'}`}
                    onClick={() => {
                      !item?.childrens?.length && onClick(item)
                    }}
                  >
                    <Menu2Outline size="1rem" /> {item.name}
                  </div>
                  {item?.childrens?.map((children, chidlIndex) => {
                    return (
                      <div
                        className={`pl-5 px-2  menu-option menu-item cursor-pointer `}
                        key={`children-${chidlIndex}-${index}`}
                        onClick={() => {
                          onClick(children)
                        }}
                      >
                        <MenuArrowOutline size="1rem" /> {children.name}
                        <div
                          className={`${chidlIndex % 2 == 0 && 'menu-children'}`}
                        ></div>
                      </div>
                    )
                  })}
                  <div
                    className={`${index + 1 != items?.length && 'parent-option-seperator'}`}
                  ></div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

DropDownMenu.propTypes = {
  children: PropTypes.any,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  showMenu: PropTypes.bool,
  outsideClickClose: PropTypes.bool,
  width: PropTypes.string,
}

export default DropDownMenu
