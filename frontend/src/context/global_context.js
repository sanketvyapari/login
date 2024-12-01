import React, { createContext, useReducer } from 'react'

const Reducer = (data, payload) => {
  switch (payload.type) {
    case 'header': {
      return { ...data, ...payload.data, loader: {}, notification: {} }
    }
    case 'notification': {
      return { ...data, notification: payload.data, loader: {} }
    }
    case 'loader': {
      return {
        ...data,
        loader: payload.data,
        notification: payload.notification,
      }
    }
    default: {
      return {}
    }
  }
}

const initialState = {
  header: null,
  sub_header: null,
  show_back_btn: true,
  notification: {},
  loader: {},
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <NavContext.Provider value={[state, dispatch]}>
      {children}
    </NavContext.Provider>
  )
}

export const NavContext = createContext(initialState)
export default Store
