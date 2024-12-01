import { NoEntry } from '@styled-icons/boxicons-solid'

const ErrorCard = (props) => {
  return (
    <div className="flex-grow flex  justify-center  text-2xl mx-auto container text-white">
      <div
        className="flex justify-center bg-tracer-dark-blue mt-20 w-3/4 p-20"
        style={{
          border: '0.2rem solid',
          borderRadius: '1rem',
        }}
      >
        <div>
          <div className="font-bold text-5xl">
            <NoEntry size="3rem" color="white" />
            {props.title}
          </div>
          <div>{props.sub_title}</div>
        </div>
      </div>
    </div>
  )
}

export default ErrorCard
