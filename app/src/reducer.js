import * as R from 'ramda'
import * as RemoteData from './remoteData'
import * as actions from './actions'
import * as Rating from './rating'

const INITIAL_STATE = {
  albums: RemoteData.ready(),
  artistQuery: '',
  sorter: 'id',
  selectedAlbumId: null,
}

const receiveAlbums = albums =>
  albums.map(album => ({
    ...album,
    rating: 'rating' in album ? album.rating : Rating.NotRated,
  }))

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.LOADING_ALBUMS:
      return { ...state, albums: RemoteData.loading() }

    case actions.RECEIVE_ALBUMS:
      return {
        ...state,
        albums: RemoteData.success(receiveAlbums(action.payload)),
      }

    case actions.ERROR_ALBUMS:
      return { ...state, albums: RemoteData.fail(action.payload) }

    case actions.SEARCH_ARTIST:
      return { ...state, artistQuery: action.payload }

    case actions.SORT_BY:
      return { ...state, sorter: action.payload }

    case actions.SELECT_ALBUM:
      return { ...state, selectedAlbumId: action.payload.id }

    case actions.UNSELECT_ALBUM:
      return { ...state, selectedAlbumId: null }

    case actions.UPDATE_ALBUM: {
      const newAlbum = action.payload

      return {
        ...state,
        albums: RemoteData.map(
          R.map(album => (album.id === newAlbum.id ? newAlbum : album)),
          state.albums,
        ),
      }
    }

    default:
      return state
  }
}
