import * as api from './api'
import * as selectors from './selectors'

export const LOADING_ALBUMS = 'app/LOADING_ALBUMS'
export const RECEIVE_ALBUMS = 'app/RECEIVE_ALBUMS'
export const ERROR_ALBUMS = 'app/ERROR_ALBUMS'
export const SEARCH_ARTIST = 'app/SEARCH_ARTIST'
export const SORT_BY = 'app/SORT_BY'
export const SELECT_ALBUM = 'app/SELECT_ALBUM'
export const UNSELECT_ALBUM = 'app/UNSELECT_ALBUM'
export const UPDATE_ALBUM = 'app/UPDATE_ALBUM'

export const loadingAlbums = () => ({ type: LOADING_ALBUMS })
export const receiveAlbums = albums => ({
  type: RECEIVE_ALBUMS,
  payload: albums,
})
export const errorAlbums = error => ({
  type: ERROR_ALBUMS,
  payload: error,
  error: true,
})
export const searchArtist = artist => ({
  type: SEARCH_ARTIST,
  payload: artist,
})
export const sortBy = sorter => ({
  type: SORT_BY,
  payload: sorter,
})
export const selectAlbum = album => ({ type: SELECT_ALBUM, payload: album })
export const unselectAlbum = () => ({ type: UNSELECT_ALBUM })

export const loadAlbums = () => async dispatch => {
  dispatch(loadingAlbums())

  try {
    const albums = await api.all()
    dispatch(receiveAlbums(albums))
  } catch (e) {
    dispatch(errorAlbums(e))
  }
}

export const rateAlbum = rating => async (dispatch, getState) => {
  const album = selectors.selectedAlbum(getState())

  if (!album) {
    return
  }

  const newAlbum = { ...album, rating }

  dispatch({ type: UPDATE_ALBUM, payload: newAlbum })

  try {
    await api.update(newAlbum)
  } catch (e) {
    // Revert changes to state
    dispatch({ type: UPDATE_ALBUM, payload: album })
  }
}
