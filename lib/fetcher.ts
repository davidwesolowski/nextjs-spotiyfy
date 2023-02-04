export const fetcher = (url: string, data = undefined) => {
  return fetch(`${window.location.origin}/api${url}`, {
    body: JSON.stringify(data),
    credentials: 'include',
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status > 399 || res.status < 200) {
      throw new Error('Error while fetching')
    }
    return res.json()
  })
}
