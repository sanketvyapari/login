import PropTypes from 'prop-types'

import Select from 'react-select'
import { ProgresSpinner } from './ProgresSpinner'

const SelectInput = ({
  isMulti = false,
  isRequired = true,
  onChange = () => {},
  options = [],
  optionLabel = '',
  optionValue = '',
  onInputChange = () => {},
  filterOption = null,
  label,
  name,
  value,
  placeholder,
  formatOptionLabel,
  showLoader = false,
  onMenuOpen = () => {},
}) => {
  return (
    <div className="p-2 w-full">
      <label className="flex justify-between">
        <div className="flex">
          <span className="text-white">{label}</span>
          {isRequired && <span className="text-red-700">*</span>}
        </div>
        {showLoader && <ProgresSpinner />}
      </label>
      <div className="mt-2">
        <Select
          name={name}
          inputName={name}
          classNamePrefix="dtcs-filter"
          isMulti={isMulti}
          value={value}
          options={options}
          placeholder={placeholder ? placeholder : label}
          className="w-full"
          onChange={(e) => {
            onChange(e)
          }}
          required={isRequired}
          getOptionLabel={(option) =>
            optionLabel ? option[optionLabel] : option.label
          }
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          onInputChange={(value) => {
            onInputChange(value)
          }}
          isClearable={true}
          isSearchable={true}
          formatOptionLabel={
            formatOptionLabel
              ? formatOptionLabel
              : (option) => (
                  <>
                    <div>
                      {optionLabel ? option[optionLabel] : option.label}
                    </div>
                  </>
                )
          }
          filterOption={filterOption}
          menuShouldScrollIntoView={true}
          onMenuOpen={() => {
            onMenuOpen()
          }}
        />
      </div>
    </div>
  )
}

SelectInput.propTypes = {
  className: PropTypes.string,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.array,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  formatOptionLabel: PropTypes.func,
  showLoader: PropTypes.bool,
}

export default SelectInput
