import PropTypes from 'prop-types'

const InlineCheckbox = (props) => {
  return (
    <div className="p-2">
      <label className="text-white">{props.label}</label>

      <input
        autoComplete="off"
        name={props.name}
        className={`bg-white block cursor-pointer   text-black rounded focus:outline-none h-10 px-5 pr-5 ${props.className}`}
        placeholder={props.placeholder ? props.placeholder : props.label}
        required={props.isRequired}
        type={'checkbox'}
        onChange={(e) => {
          props.onChange(e.target.checked)
        }}
        checked={props?.value}
      />
    </div>
  )
}

InlineCheckbox.defaultProps = {
  isRequired: false,
  onChange: () => {},
}

InlineCheckbox.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}

export default InlineCheckbox
