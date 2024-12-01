export const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const toJson = (str) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return str
  }
}

export const toString = (data) => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    return data
  }
}
