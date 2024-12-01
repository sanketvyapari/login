import { Data } from '@styled-icons/boxicons-solid'

const NoDataFound = (props) => {
  return (
    <div
      className={`flex justify-center py-6 items-center ${props?.bgColor ? props?.bgColor : 'bg-white'}`}
      style={{ height: '100%' }}
    >
      No Data Found <Data size="2rem" color="gray" />
    </div>
  )
}

export default NoDataFound
