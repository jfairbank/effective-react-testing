import React from 'react'
import * as Rating from 'src/rating'

describe('Album', () => {
  const album = {
    title: 'An Album',
    artists: ['Jane', 'Joe'],
    coverUrl: 'album.jpg',
    rating: Rating.Liked,
    reviews: ['Great', 'Awesome'],
  }
})
