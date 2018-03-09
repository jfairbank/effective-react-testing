import React from 'react'
import { Provider } from 'react-redux'
import td from 'testdouble'
import { mount, render, shallow } from 'enzyme'
import reducer from 'src/reducer'
import * as actions from 'src/actions'
import * as RemoteData from 'src/remoteData'
import { configureStore } from 'src/store'
import App from 'src/components/AppContainer'
import * as Rating from 'src/rating'

const delay = t => new Promise(r => setTimeout(r, t))
const tick = () => delay(0)

describe('reducer', () => {
  const initialState = reducer(undefined, {})

  it('produces an albums loading state', () => {
    const result = reducer(initialState, actions.loadingAlbums())

    expect(result).toEqual({
      ...initialState,
      albums: RemoteData.loading(),
    })
  })

  it('receives albums', () => {
    const albums = [{}, {}]

    const result = reducer(initialState, actions.receiveAlbums(albums))

    expect(result).toEqual({
      ...initialState,
      albums: RemoteData.success(albums),
    })
  })

  it('updates an album', () => {
    const albums = [{ id: 1 }, { id: 2 }]
    const state = reducer(initialState, actions.receiveAlbums(albums))

    const newAlbum = { id: 1, review: 'Great album' }

    const result = reducer(state, {
      type: actions.UPDATE_ALBUM,
      payload: newAlbum,
    })

    expect(result).toEqual({
      ...state,
      albums: RemoteData.success([newAlbum, { id: 2 }]),
    })
  })
})

describe('async actions', () => {
  let getState
  let dependencies
  let dispatch

  beforeEach(() => {
    getState = td.function('getState')

    dependencies = {
      api: td.object(),
      selectors: td.object(),
    }

    dispatch = td.function('dispatch')
  })

  describe('fetching albums', () => {
    it('fetches albums', async () => {
      const albums = [{}, {}]

      td.when(dependencies.api.all()).thenResolve(albums)

      await actions.loadAlbums()(dispatch, getState, dependencies)

      // td.verify(dispatch(actions.loadingAlbums()))
      td.verify(dispatch(actions.receiveAlbums(albums)))
    })

    it('sends an error if the api call fails', async () => {
      const error = new Error('Uh oh')

      td.when(dependencies.api.all()).thenThrow(error)

      await actions.loadAlbums()(dispatch, getState, dependencies)

      td.verify(dispatch(actions.errorAlbums(error)))
    })
  })

  describe('reviewing an album', () => {
    it('updates the album', async () => {
      const album = { id: 1 }
      const expectedAlbum = { id: 1, review: 'Great album' }

      td.when(getState()).thenReturn('state')
      td.when(dependencies.selectors.selectedAlbum('state')).thenReturn(album)
      td.when(dependencies.api.update(expectedAlbum)).thenResolve()

      await actions.reviewAlbum('Great album')(dispatch, getState, dependencies)

      td.verify(
        dispatch({
          type: actions.UPDATE_ALBUM,
          payload: expectedAlbum,
        }),
      )

      td.verify(
        dispatch({
          type: actions.UPDATE_ALBUM,
          payload: album,
        }),
        { times: 0 },
      )
    })
  })
})

describe('store integration tests', () => {
  // let api
  let store

  beforeEach(() => {
    global.fetch = td.function('fetch')
    // api = td.object()
    store = configureStore(require('src/api'), require('src/selectors'))
  })

  it('loads albums', async () => {
    const albums = [{}, {}]
    // td.when(api.all()).thenResolve(albums)
    td.when(fetch('http://localhost:3001/albums')).thenResolve({
      json: () => Promise.resolve(albums),
    })

    await store.dispatch(actions.loadAlbums())

    expect(store.getState().albums).toEqual(RemoteData.success(albums))
  })

  it('displays albums', async () => {
    const albums = [
      {
        id: 1,
        title: 'Awesome Jazz',
        artists: ['Jane'],
        rating: Rating.NotRated,
        review: '',
      },
    ]

    td.when(fetch('http://localhost:3001/albums')).thenResolve({
      json: () => Promise.resolve(albums),
    })

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(wrapper.contains('Loading...')).toBe(true)

    // This isn't great having to do these steps :(
    await tick()
    wrapper.update()

    expect(wrapper.contains('Awesome Jazz')).toBe(true)
    expect(wrapper.contains('Jane')).toBe(true)

    // Could keep going on integration testing like this, but will grow
    // tedious, flaky, and hard to debug failures.
    // There's a better way :)
  })
})
