import PropTypes from 'prop-types'

const InputText = ({
  isRequired = true,
  onChange = () => {},
  readOnly = false,
  isFullSize = true,
  label,
  name,
  placeholder,
  className = '',
  type,
  value,
  maxLength = undefined,
  wrapperClass = '',
  pattern = undefined,
}) => {
  return (
    <div className={`${isFullSize && 'p-2'} w-full ${wrapperClass}`}>
      {label && (
        <label>
          <span className="text-white">{label}</span>
          {isRequired && <span className="text-red-700">*</span>}
        </label>
      )}
      <input
        id={`${name}`}
        autoComplete="off"
        name={name}
        className={`w-full bg-white  text-black  rounded focus:outline-none ${className} ${isFullSize ? 'h-10 px-5 pr-5' : 'px-1'} ${label && 'mt-2'}`}
        placeholder={placeholder ? placeholder : label}
        required={isRequired}
        type={`${type}`}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        readOnly={readOnly}
        maxLength={maxLength}
        pattern={pattern}
        defaultValue={value}
      />
    </div>
  )
}

InputText.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  isFullSize: PropTypes.bool,
  maxLength: PropTypes.number,
  wrapperClass: PropTypes.string,
}

export default InputText
