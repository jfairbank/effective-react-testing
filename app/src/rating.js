export const NotRated = 0
export const Liked = 1
export const Disliked = 2

const isRating = rating => value => value === rating

export const isNotRated = isRating(NotRated)
export const isLiked = isRating(Liked)
export const isDisliked = isRating(Disliked)
