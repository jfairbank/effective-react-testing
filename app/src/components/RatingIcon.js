import React from 'react'
import classNames from 'classnames'
import Icon from '@fortawesome/react-fontawesome'
import * as Rating from '../rating'
import * as styles from './RatingIcon.module.css'

const RatingIcon = ({
  className,
  dataId,
  icon,
  size,
  rating,
  albumRating,
  onRate = () => {},
}) => {
  const selected = rating === albumRating
  const nextRating = selected ? Rating.NotRated : rating

  return (
    <button
      className={classNames(styles.button, {
        [styles.rateable]: onRate,
      })}
      onClick={() => onRate(nextRating)}
    >
      <Icon
        className={classNames(className, {
          [styles.selected]: selected,
        })}
        data-id={dataId}
        icon={selected ? icon : ['far', icon]}
        size={size}
      />
    </button>
  )
}

export const Like = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className={styles.liked}
    dataId="rating-like"
    icon="thumbs-up"
    rating={Rating.Liked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)

export const Dislike = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className={styles.disliked}
    dataId="rating-dislike"
    icon="thumbs-down"
    rating={Rating.Disliked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)
