import React from 'react'
import classNames from 'classnames'
import Icon from '@fortawesome/react-fontawesome'
import * as Rating from './rating'
import './RatingIcon.module.css'

const RatingIcon = ({ className, icon, size, rating, albumRating, onRate }) => {
  const selected = rating === albumRating
  const nextRating = selected ? Rating.NotRated : rating

  return (
    <button
      className={classNames('rating-icon-button', {
        'rating-icon-button--rateable': onRate,
      })}
      onClick={() => onRate && onRate(nextRating)}
    >
      <Icon
        className={classNames(className, {
          'rating-icon--selected': selected,
        })}
        icon={selected ? icon : ['far', icon]}
        size={size}
      />
    </button>
  )
}

export const Like = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className="rating-icon--liked"
    icon="thumbs-up"
    rating={Rating.Liked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)

export const Dislike = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className="rating-icon--disliked"
    icon="thumbs-down"
    rating={Rating.Disliked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)