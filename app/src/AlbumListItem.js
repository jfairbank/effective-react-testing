import React from 'react'
import classNames from 'classnames'
import { Like, Dislike } from './RatingIcon'
import * as Rating from './rating'
import './AlbumListItem.module.css'

const RatingIcon = ({ rating }) => {
  switch (rating) {
    case Rating.Liked:
      return (
        <div className="album-list-item__rating">
          <Like size="2x" albumRating={rating} />
        </div>
      )

    case Rating.Disliked:
      return (
        <div className="album-list-item__rating">
          <Dislike size="2x" albumRating={rating} />
        </div>
      )

    default:
      return null
  }
}

const AlbumListItem = ({ album, onSelectAlbum }) => (
  <div
    className={classNames('album-list-item', {
      'album-list-item--liked': Rating.isLiked(album.rating),
      'album-list-item--disliked': Rating.isDisliked(album.rating),
    })}
    onClick={() => onSelectAlbum(album)}
  >
    <img src={album.coverUrl} alt="" />
    <RatingIcon rating={album.rating} />
    <h2 className="album-list-item__title">{album.title}</h2>
    <h3 className="album-list-item__artists">{album.artists.join(' - ')}</h3>
  </div>
)

export default AlbumListItem
