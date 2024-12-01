const ENCRYPTION_KEY = 'eyJhbGciOiJIUzI1NiJ9'

export const encrypt = (text, key = ENCRYPTION_KEY) => {
  return [...text]
    .map((x, i) =>
      (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
}
export const decrypt = (text, key = ENCRYPTION_KEY) => {
  return String.fromCharCode(
    ...text
      .match(/.{1,2}/g)
      .map((e, i) => parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
  )
}
