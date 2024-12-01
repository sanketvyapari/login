import PropTypes from 'prop-types'
import { ProgresSpinner } from './ProgresSpinner'

const NoRecordsFound = ({ loading = false, caption = 'Loading ...' }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center bg-white py-2 px-3 border-b border-tracer-dark-blue text-black">
        {loading ? <ProgresSpinner caption={caption} /> : `No record's found`}
      </div>
    </div>
  )
}

NoRecordsFound.propTypes = {
  loading: PropTypes.bool,
  caption: PropTypes.string,
}

export default NoRecordsFound
