const defaultHeaders = {
  'content-type': `application/x-www-form-urlencoded`,
  accept: `application/json`,
}

// from https://ccoenraets.github.io/es6-tutorial-data/promisify/
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
export const request = obj =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(obj.method || `GET`, obj.url)
    const headers = Object.assign({}, defaultHeaders, obj.headers)
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({ status: xhr.status, message: xhr.statusText })
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send(obj.body)
  })

request.post = (url, body, headers) =>
  request({ method: `POST`, url, body, headers })

request.postJson = (url, body, headers) =>
  request({ method: `POST`, url, headers, body: JSON.stringify(body) })
