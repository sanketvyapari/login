import { createSearchParams } from 'react-router-dom'
import { getLocalStorageData } from './LocalStorageAccess'

export const humanizeBool = (bool) => (bool ? 'Yes' : 'No')
export const formatEmptyValue = (value) => (value ? value : '-')
export const formatDate = (value) => {
  return new Date(value).toDateString()
}

export const formatDateTime = (value) => {
  let dateObj = new Date(value)
  return `${dateObj.toDateString()} ${dateObj.getHours()}:${dateObj.getMinutes()} ${dateObj.getHours() < 12 ? 'AM' : 'PM'}`
}

export const downloadFile = (fileURL, fileName) => {
  var xhr = new XMLHttpRequest()
  xhr.open('get', fileURL, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.response)
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(xhr.response)
      link.download = fileName
      link.click()
    }
  }
  xhr.send()
}

export const downloadErrorLogs = (text, filename = 'log.txt') => {
  let element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text.join('\n'))
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const downloadFileBlob = (data, fileName) => {
  let url = window.URL.createObjectURL(data)
  let link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName}`)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const toTitleCase = (str) => {
  return str
    .toLocaleLowerCase()
    .replace(
      /(^|Ü|ü|Ş|ş|Ç|ç|İ|ı|Ö|ö|\w)\S*/g,
      (txt) => txt.charAt(0).toLocaleUpperCase() + txt.substring(1)
    )
}

export const getVehicleRedirectUrl = () => {
  return getLocalStorageData('vehicle')?.search
    ? `/vehicles/?${createSearchParams(getLocalStorageData('vehicle'))}`
    : `/vehicles`
}
