import React from 'react'
import PropTypes from 'prop-types'
import LinkWithStatus from './LinkWithStatus'

const Pagination = ({
  onClickNext,
  onClickPrev,
  context: {
    currentPage = 1,
    totalCount = 1,
    prevPageLink,
    nextPageLink,
    totalPages,
  },
}) => {
  if (totalCount < 2) return null

  const navDesc = (
    <span className="text-white px-5">
      Page{' '}
      <span className="font-bold">
        {parseInt(currentPage)} of{' '}
        {parseInt(totalPages) < 1 ? 1 : parseInt(totalPages)}
      </span>
    </span>
  )

  const prevButton = prevPageLink ? (
    <LinkWithStatus
      href={prevPageLink}
      onClickFunc={() => {
        onClickPrev(prevPageLink)
      }}
      className="btn"
      title="Prev"
    />
  ) : (
    ''
  )
  const nextButton = nextPageLink ? (
    <LinkWithStatus
      href={nextPageLink}
      onClickFunc={() => {
        onClickNext(nextPageLink)
      }}
      className="btn"
      title="Next"
    />
  ) : (
    ''
  )

  return (
    <div className="flex w-full justify-center items-center">
      {prevButton} {totalCount > 0 && navDesc} {nextButton}
    </div>
  )
}

Pagination.propTypes = {
  context: PropTypes.object,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
}

export default Pagination
