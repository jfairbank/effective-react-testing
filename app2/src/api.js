const baseUrl = 'http://localhost:3001'
// const baseUrl = 'https://jazz-jf-server.ngrok.io'

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

// export const all = () =>
//   fetch(`${baseUrl}/albums`)
//     .then(r => r.json())
//     .then(albums =>
//       albums.map(album => ({
//         ...album,
//         coverUrl: album.coverUrl.replace(
//           'http://localhost:3001',
//           'https://jazz-jf-server.ngrok.io',
//         ),
//       })),
//     )

// export const update = album =>
//   put(`${baseUrl}/albums/${album.id}`, {
//     ...album,
//     coverUrl: album.coverUrl.replace(
//       'https://jazz-jf-server.ngrok.io',
//       'http://localhost:3001',
//     ),
//   })
