export const all = () =>
  fetch('http://localhost:3001/albums').then(r => r.json())
