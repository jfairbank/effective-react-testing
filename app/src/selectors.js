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

const sortProperties = {
  [Sorter.Id]: 'id',
  [Sorter.Title]: 'title',
  [Sorter.Artist]: 'artists',
}

const sortProperty = sorter => sortProperties[sorter]

const filterByRating = checkRating =>
  R.filter(R.pipe(R.prop('rating'), checkRating))

const filters = {
  [Filter.All]: R.identity,
  [Filter.Liked]: filterByRating(Rating.isLiked),
  [Filter.Disliked]: filterByRating(Rating.isDisliked),
}

const filterBy = filter => albums => filters[filter](albums)

const sortBy = sorter => R.sortBy(R.prop(sortProperty(sorter)))

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
