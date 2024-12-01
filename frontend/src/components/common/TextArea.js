import PropTypes from 'prop-types'

const TextArea = ({
  className = '',
  onChange = () => {},
  label,
  name,
  placeholder = '',
  isRequired = true,
  value = '',
  wrapperClass = '',
  hint = '',
}) => {
  return (
    <div className={`w-full ${wrapperClass ? wrapperClass : 'p-2'}`}>
      <label>
        {label}
        {isRequired && <span className="text-red-700">*</span>}
      </label>
      <textarea
        autoComplete="off"
        name={name}
        className={`w-full bg-white  text-black  px-2 pr-5 rounded focus:outline-none mt-2 ${className}`}
        placeholder={placeholder ? placeholder : label}
        required={isRequired}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        rows="4"
        defaultValue={value ? value : ''}
      />
      {hint && <span className="text-red-700 text-sm">{hint}</span>}
    </div>
  )
}

TextArea.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  wrapperClass: PropTypes.string,
}

export default TextArea
