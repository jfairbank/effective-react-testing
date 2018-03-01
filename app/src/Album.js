import React from 'react'
import classNames from 'classnames'
import Icon from '@fortawesome/react-fontawesome'
import * as Rating from './rating'
import './Album.module.css'

// const selectedIcon = name

const RatingIcon = ({ className, icon, size, rating, albumRating, onRate }) => {
  const selected = rating === albumRating
  const nextRating = selected ? Rating.NotRated : rating

  return (
    <button
      className="album__rating-icon-button"
      onClick={() => onRate(nextRating)}
    >
      <Icon
        className={classNames(className, {
          'album__rating--selected': selected,
        })}
        icon={selected ? icon : ['far', icon]}
        size={size}
      />
    </button>
  )
}

const Album = ({ album, onGoBack, onRate }) => (
  <div className="album">
    <button className="album__go-back" onClick={onGoBack}>
      Go Back
    </button>

    <div className="album__content">
      <h1 className="album__title">{album.title}</h1>
      <h2 className="album__artists">{album.artists.join(' - ')}</h2>

      <div className="album__cover">
        <img src={album.coverUrl} alt="" />
      </div>

      <div className="album__ratings">
        <RatingIcon
          className="album__rating--liked"
          icon="thumbs-up"
          size="3x"
          rating={Rating.Liked}
          albumRating={album.rating}
          onRate={onRate}
        />

        <RatingIcon
          className="album__rating--disliked"
          icon="thumbs-down"
          size="3x"
          rating={Rating.Disliked}
          albumRating={album.rating}
          onRate={onRate}
        />
      </div>
    </div>
  </div>
)

export default Album
