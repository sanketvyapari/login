import React, { createContext, useReducer } from 'react'

const UploadReducer = (data, payload) => {
  switch (payload.type) {
    case 'version': {
      return {
        ...data,
        selected_version: payload.data,
        file_type: payload.file_type,
        file_name: payload.file_name,
      }
    }
    default: {
      return { ...data }
    }
  }
}

const initialState = {
  selected_version: null,
  selected_action: null,
  file_type: null,
}

const UploadStore = ({ children }) => {
  const [state, dispatch] = useReducer(UploadReducer, initialState)

  return (
    <UploadContext.Provider value={[state, dispatch]}>
      {children}
    </UploadContext.Provider>
  )
}

export const UploadContext = createContext(initialState)
export default UploadStore
