import * as R from 'ramda'
import * as RemoteData from './remoteData'

export const selectedAlbum = state =>
  R.pipe(
    RemoteData.map(R.find(R.propEq('id', state.selectedAlbumId))),
    RemoteData.unwrap,
  )(state.albums)

export const filteredAndSortedAlbums = ({ artistQuery, sorter, albums }) =>
  // artistQuery
  //   ? remoteData.map(albums, albumList =>
  //       albumList.filter(album =>
  //         album.artists.some(artist =>
  //           new RegExp(artistQuery, 'i').test(artist),
  //         ),
  //       ),
  //     )
  //   : albums
  RemoteData.map(
    R.pipe(
      R.filter(
        R.pipe(
          R.prop('artists'),
          R.any(R.test(new RegExp(artistQuery.trim(), 'i'))),
        ),
      ),
      R.sortBy(R.prop(sorter)),
    ),
    albums,
  )
