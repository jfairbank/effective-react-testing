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

  xit('receives albums', () => {})

  xit('updates an album', () => {})
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
    xit('fetches albums', async () => {})

    xit('sends an error if the api call fails', async () => {})
  })

  describe('reviewing an album', () => {
    const album = { id: 1, reviews: [] }
    const expectedAlbum = { id: 1, reviews: ['Great album'] }

    beforeEach(() => {
      td.when(getState()).thenReturn('state')
      td.when(dependencies.selectors.selectedAlbum('state')).thenReturn(album)
    })

    xit('updates the album', async () => {})
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

  xit('loads albums', async () => {})

  xit('reviews an album', async () => {})

  xit('displays albums', async () => {})
})
