import React from 'react'
import { Provider } from 'react-redux'
import td from 'testdouble'
import { mount } from 'enzyme'
import reducer from 'src/reducer'
import * as actions from 'src/actions'
import * as RemoteData from 'src/remoteData'
import { configureStore } from 'src/store'
import App from 'src/components/AppContainer'
import * as Rating from 'src/rating'
import * as utils from './support/utils'

describe('reducer', () => {
  const initialState = reducer(undefined, {})

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

    const newAlbum = { id: 1, reviews: ['Great album'] }

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

  it('loads albums', async () => {
    const albums = [{}, {}]

    td.when(dependencies.api.all()).thenResolve(albums)

    await actions.loadAlbums()(dispatch, getState, dependencies)

    td.verify(dispatch(actions.receiveAlbums(albums)))
  })
})

describe('store integration tests', () => {
  const originalFetch = global.fetch
  let store

  beforeEach(() => {
    global.fetch = td.function('fetch')
    store = configureStore(require('src/api'), require('src/selectors'))
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('loads albums', async () => {
    const albums = [{}, {}]

    td.when(fetch('http://localhost:3001/albums')).thenResolve({
      ok: true,
      json: () => Promise.resolve(albums),
    })

    await store.dispatch(actions.loadAlbums())

    expect(store.getState().albums).toEqual(RemoteData.success(albums))
  })

  it('loads and displays albums', async () => {
    const albums = [
      {
        id: 1,
        title: 'Awesome Jazz',
        artists: ['Jane'],
        rating: Rating.NotRated,
        reviews: [],
      },
    ]

    td.when(fetch('http://localhost:3001/albums')).thenResolve({
      ok: true,
      json: () => Promise.resolve(albums),
    })

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(wrapper.contains('Loading...')).toBe(true)

    // This isn't great having to do these steps :(
    await utils.tick()
    wrapper.update()

    expect(wrapper.contains('Awesome Jazz')).toBe(true)
    expect(wrapper.contains('Jane')).toBe(true)
  })
})
