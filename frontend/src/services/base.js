import axios from 'axios'
import {
  deleteLocalStorage,
  getLocalStorageData,
} from '../utils/LocalStorageAccess'
import { AUTH_TOKEN, MAKE_ID } from '../constants/common'

const formatUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  return `${process.env.REACT_APP_API_BASE_URL}${url}`
}

export const putRequest = async (url, payload) => {
  const data = await withTryCatch(axios.put(formatUrl(url), payload))
  return data
}

export const postRequest = async (
  url,
  payload,
  isDownloadZipFile = false,
  uploadProgressConfig = {}
) => {
  let config = {
    ...uploadProgressConfig,
  }

  if (isDownloadZipFile) {
    config['responseType'] = 'blob'
    config['Content-Type'] = 'application/zip'
  }
  const data = await withTryCatch(
    axios.post(formatUrl(url), payload, config),
    isDownloadZipFile
  )
  return data
}

export const deleteRequest = async (url, payload) => {
  const data = await withTryCatch(axios.delete(formatUrl(url), payload))
  return data
}

export const getRequest = async (
  url,
  isAuthorized = true,
  isDownloadZipFile = false
) => {
  let config = {}
  if (isAuthorized) {
    axios.defaults.headers.common['Authorization'] =
      `Token ${getLocalStorageData(AUTH_TOKEN)}`
  }
  if (isDownloadZipFile) {
    config['responseType'] = 'blob'
    config['Content-Type'] = 'application/zip'
  }
  const data = await withTryCatch(
    axios.get(formatUrl(url), config),
    isDownloadZipFile
  )
  if (data?.detail === 'Invalid token.') {
    deleteLocalStorage(AUTH_TOKEN)
    deleteLocalStorage(MAKE_ID)
    window.location.href = '/users/sign_in'
  }
  if (data.hasOwnProperty('count')) {
    let currentPage = 1
    let totalPages = 1
    if (data.next) {
      let url = new URL(`${data.next}`)
      currentPage =
        url.searchParams.get('offset') / url.searchParams.get('limit')
      if (url.searchParams.get('limit')) {
        totalPages = data.count / url.searchParams.get('limit')
      } else {
        totalPages = data.count / 10
      }
    } else if (data.previous) {
      let url = new URL(`${data.previous}`)
      currentPage = data.count / url.searchParams.get('limit')
      if (url.searchParams.get('limit')) {
        totalPages = data.count / url.searchParams.get('limit')
      } else {
        totalPages = data.count / 10
      }
    }
    let pagination = {
      currentPage: Number.isInteger(currentPage)
        ? currentPage
        : parseInt(currentPage) + 1,
      totalCount: data.count,
      totalPages: Number.isInteger(totalPages)
        ? totalPages
        : parseInt(totalPages) + 1,
      prevPageLink: data.previous,
      nextPageLink: data.next,
    }
    let results = data.results
    return { results, pagination }
  }
  return data
}

const withTryCatch = async (apiCall, isDownload = false) => {
  try {
    const { data } = await apiCall
    if (isDownload) {
      return data
    } else {
      try {
        if ('status' in data) {
          return { ...data }
        } else {
          return { ...data, status: true }
        }
      } catch (error) {
        return { ...data, status: true }
      }
    }
  } catch (err) {
    if (err.response.statusText === 'Unauthorized') {
      deleteLocalStorage(AUTH_TOKEN)
      deleteLocalStorage(MAKE_ID)
      window.location.reload()
    }
    if (err.request.responseType === 'blob') {
      return {
        msg: 'Data not available or Something went wrong, please try after some time.',
      }
    }
    let msg = ''
    if (typeof err.response?.data === 'object') {
      Object.keys(err.response?.data).map((obj) => {
        console.log(obj)
        if (msg) {
          msg += `, ${obj} ${err.response?.data[obj]}`
        } else {
          msg = `${obj} ${err.response?.data[obj]}`
        }
      })
    }

    return { ...err.response.data, status: false, msg: msg }
  }
}
