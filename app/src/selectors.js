import * as R from 'ramda'
import * as RemoteData from './remoteData'
import * as Filter from './filter'
import * as Sorter from './sorter'
import * as Rating from './rating'

const searchArtist = artistQuery =>
  R.filter(
    R.pipe(
      R.prop('artists'),
      R.any(R.test(new RegExp(artistQuery.trim(), 'i'))),
    ),
  )

const filterByRating = checkRating =>
  R.filter(R.pipe(R.prop('rating'), checkRating))

const filters = {
  [Filter.All]: R.identity,
  [Filter.Liked]: filterByRating(Rating.isLiked),
  [Filter.Disliked]: filterByRating(Rating.isDisliked),
}

const filterBy = filter => albums => filters[filter](albums)

const propComparator = (propName, comparison) =>
  R.comparator((a, b) => comparison(R.prop(propName, a), R.prop(propName, b)))

const sorters = {
  [Sorter.Id]: R.sortBy(R.prop('id')),
  [Sorter.Title]: R.sortBy(R.prop('title')),
  [Sorter.Artist]: R.sort(
    R.either(propComparator('artists', R.lt), propComparator('title', R.lt)),
  ),
}

const sortBy = sorter => sorters[sorter]

export const selectedAlbum = state =>
  R.pipe(
    RemoteData.map(R.find(R.propEq('id', state.selectedAlbumId))),
    RemoteData.unwrap,
  )(state.albums)

export const filteredAndSortedAlbums = ({
  artistQuery,
  filter,
  sorter,
  albums,
}) =>
  RemoteData.map(
    R.pipe(searchArtist(artistQuery), filterBy(filter), sortBy(sorter)),
    albums,
  )
