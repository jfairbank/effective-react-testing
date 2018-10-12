import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  faThumbsDown as thumbsDownRegular,
  faThumbsUp as thumbsUpRegular,
} from '@fortawesome/free-regular-svg-icons'
import {
  faThumbsDown as thumbsDownSolid,
  faThumbsUp as thumbsUpSolid,
} from '@fortawesome/free-solid-svg-icons'
import * as Rating from '../rating'
import * as styles from './RatingIcon.module.css'

const RatingIcon = ({
  className,
  dataTest,
  icon,
  iconSelected,
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
        data-test={dataTest}
        icon={selected ? iconSelected : icon}
        size={size}
      />
    </button>
  )
}

export const Like = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className={styles.liked}
    dataTest="rating-like"
    icon={thumbsUpRegular}
    iconSelected={thumbsUpSolid}
    rating={Rating.Liked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)

export const Dislike = ({ size, albumRating, onRate }) => (
  <RatingIcon
    className={styles.disliked}
    dataTest="rating-dislike"
    icon={thumbsDownRegular}
    iconSelected={thumbsDownSolid}
    rating={Rating.Disliked}
    size={size}
    albumRating={albumRating}
    onRate={onRate}
  />
)
