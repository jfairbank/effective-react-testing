const baseUrl = 'http://localhost:3001'

const put = (url, body) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(r => {
    if (!r.ok) {
      const error = new Error('Fetch error')
      error.response = r
      throw error
    }

    return r.json()
  })

export const all = () => fetch(`${baseUrl}/albums`).then(r => r.json())
export const update = album => put(`${baseUrl}/albums/${album.id}`, album)
