import React from 'react'
import PropTypes from 'prop-types'
import FlashAlert from './FlashAlert'
import store from './state/store'
import { initFlashes, deleteFlashes } from './state/actions'
import { Alert, Info } from '@styled-icons/foundation'
import { ErrorCircle, CheckCircle } from '@styled-icons/boxicons-solid'

const AlertIcons = ({ type }) => {
  switch(type){
    case 'error': return <ErrorCircle />;
    case 'alert': return <Alert />;
    case 'notice': return <Info />;
    case 'success': return <CheckCircle />;
    default: return <CheckCircle />
  }
}

class FlashAlerts extends React.Component {
  constructor(props) {
    store.dispatch(initFlashes(props.messages))
    super(props)
    this.unsubscribe = store.subscribe(this.stateChange.bind(this))
    this.state = {
      messages: store.getState().flashes
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  stateChange = () => {
    this.setState({ messages: store.getState().flashes })
  }

  alertColorClass = (type) => {
    const classes = {
      error: { bg: 'red-700', text: 'white' },
      alert: { bg: 'yellow-500', text: 'black' },
      notice: { bg: 'gray-200', text: 'blue-600' },
      success: { bg: 'green-700', text: 'white' }
    }

    return classes[type] || classes.notice
  }

  alertColors = (msg) => {
    return this.alertColorClass(msg.type)
  }

  onClose = (msg) => {
    store.dispatch(deleteFlashes([msg]))
  }

  render() {
    const { messages } = this.state

    return(
      <>
        { messages.length > 0 &&
            <div className='flex flex-col mx-auto container items-center w-full z-40'>
              <div className='w-full'>
                { messages.map(
                    (msg, i) => (
                      <FlashAlert
                        key={i}
                        text={msg.body}
                        bgColor={this.alertColors(msg).bg}
                        borderColor={this.alertColors(msg).bg}
                        textColor={this.alertColors(msg).text}
                        svgIcon={<AlertIcons type={msg.type} />}
                        onClose={() => this.onClose(msg)}
                      />
                    )
                  )
                }
              </div>
            </div>
        }
      </>
    )
  }
}

FlashAlerts.propTypes = {
  messages: PropTypes.array.isRequired
}

export default FlashAlerts
