import PropTypes from 'prop-types'
import { XCircle } from '@styled-icons/boxicons-solid'
import { useState } from 'react'
import Tooltip from './tooltip'

const FileField = ({
  onChange = () => {},
  isRequired = true,
  readOnly = false,
  accept = 'image/svg',
  clearFile = () => {},
  name,
  label,
  className = '',
}) => {
  const [value, setValues] = useState(null)

  const clearFileData = () => {
    setValues(null)
    clearFile(name)
  }
  return (
    <div className="p-2">
      <label className="text-white" htmlFor={name}>
        {label}
        {isRequired && <span className="text-red-700">*</span>}
      </label>
      <input
        name={name}
        type="file"
        id={name}
        onChange={(e) => {
          setValues(e.target.value)
          onChange(e, name)
        }}
        value={value ? value : ''}
        style={{ display: value ? 'none' : 'inline' }}
        accept={accept}
        required={isRequired}
        readOnly={readOnly}
        className={`w-full text-white h-10 rounded focus:outline-none mt-2 ${className}`}
      />

      {value && (
        <div className="flex items-center text-white rounded focus:outline-none mt-2">
          <XCircle
            className={'text-red-500 mr-3 cursor-pointer'}
            onClick={(e) => clearFileData('svg')}
            size="2rem"
          />
          <div className="table_text">
            <Tooltip position={'top'} message={value}>
              <div>{value}</div>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  )
}

FileField.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  accept: PropTypes.string,
}

export default FileField
