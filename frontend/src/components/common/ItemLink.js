import React from 'react'
import PropTypes from 'prop-types'
import LinkWithStatus from './LinkWithStatus'

const ItemLink = (props) => {
  const { requestUri, name, description, infoLines } = props
  return (
    <div className="hover:bg-blue-100 flex flex-row items-center bg-white w-full p-4 mb-2">
      <LinkWithStatus href={requestUri} className="w-full pl-4">
        <div className="font-bold">{name}</div>
        <div>{description}</div>
        {infoLines.map((iline) => (
          <div className="text-xs break-all">HS: {iline}</div>
        ))}
      </LinkWithStatus>
    </div>
  )
}

ItemLink.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  requestUri: PropTypes.string.isRequired,
  infoLines: PropTypes.array,
}

export default ItemLink
