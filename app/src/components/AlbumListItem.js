import React from 'react'
import classNames from 'classnames'
import { Like, Dislike } from './RatingIcon'
import * as Rating from '../rating'
import * as styles from './AlbumListItem.module.css'

const RatingIconWrapper = ({ children }) => (
  <div className={styles.rating}>{children}</div>
)

const RatingIcon = ({ rating }) => {
  switch (rating) {
    case Rating.Liked:
      return (
        <RatingIconWrapper>
          <Like size="2x" albumRating={rating} />
        </RatingIconWrapper>
      )

    case Rating.Disliked:
      return (
        <RatingIconWrapper>
          <Dislike size="2x" albumRating={rating} />
        </RatingIconWrapper>
      )

    default:
      return null
  }
}

const AlbumListItem = ({ album, onSelectAlbum }) => (
  <div
    className={classNames(styles.albumListItem, {
      [styles.liked]: Rating.isLiked(album.rating),
      [styles.disliked]: Rating.isDisliked(album.rating),
    })}
    onClick={() => onSelectAlbum(album)}
    data-test="album-list-item"
  >
    <img src={album.coverUrl} alt="" />

    <RatingIcon rating={album.rating} />

    <h2 className={styles.title} data-test="title">
      {album.title}
    </h2>

    <h3 className={styles.artists} data-test="artists">
      {album.artists.join(' - ')}
    </h3>
  </div>
)

export default AlbumListItem
