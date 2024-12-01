import { toJson, toString } from './json'

export const getLocalStorageData = (key) => {
  try {
    return toJson(localStorage.getItem(key))
  } catch (error) {
    return localStorage.getItem(key)
  }
}

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, toString(data))
}

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key)
}
