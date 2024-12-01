export const ModalHeader = (props) => {
  return (
    <div className={`modal__head ${props.className}`}>{props.children}</div>
  )
}

ModalHeader.displayName = 'ModalHeader'

export const ModalBody = (props) => {
  return <div className="modal__body">{props.children}</div>
}

ModalBody.displayName = 'ModalBody'

export const ModalFooter = (props) => {
  return <div className="modal__footer">{props.children}</div>
}

ModalFooter.displayName = 'ModalFooter'

const Modal = (props) => {
  return (
    props?.show && (
      <div id="demo-modal" className="modal">
        <div
          className={`modal__content ${props?.size ? props?.size : 'w-2/4'}`}
        >
          <a
            href="#"
            className={`modal__close ${props.closeBtnClass}`}
            onClick={() => {
              props.onClose()
            }}
          >
            &times;
          </a>

          {props.children.find((element) => {
            return element.type.displayName === 'ModalHeader'
          })}

          <div className="body">
            {props.children.find((element) => {
              return element.type.displayName === 'ModalBody'
            })}
          </div>
          <div className="footer">
            {props.children.find((element) => {
              return element.type.displayName === 'ModalFooter'
            })}
          </div>
        </div>
      </div>
    )
  )
}

export default Modal
