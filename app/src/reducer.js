import { Maybe } from 'ramda-fantasy'
import * as remoteData from './remoteData'
import * as actions from './actions'

const INITIAL_STATE = {
  albums: remoteData.ready(),
  artistQuery: '',
  sorter: 'id',
  selectedAlbum: Maybe.Nothing(),
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.LOADING_ALBUMS:
      return { ...state, albums: remoteData.loading() }

    case actions.RECEIVE_ALBUMS:
      return { ...state, albums: remoteData.success(action.payload) }

    case actions.ERROR_ALBUMS:
      return { ...state, albums: remoteData.error(action.payload) }

    case actions.SEARCH_ARTIST:
      return { ...state, artistQuery: action.payload }

    case actions.SORT_BY:
      return { ...state, sorter: action.payload }

    case actions.SELECT_ALBUM:
      return { ...state, selectedAlbum: Maybe.Just(action.payload) }

    case actions.UNSELECT_ALBUM:
      return { ...state, selectedAlbum: Maybe.Nothing() }

    default:
      return state
  }
}
