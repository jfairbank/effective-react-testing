import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'
import * as RemoteData from 'src/remoteData'
import App from 'src/components/App'
import Albums from 'src/components/Albums'
import Album from 'src/components/Album'

describe('App', () => {
  let subject

  beforeEach(() => {
    subject = (overrideProps = {}) => (
      <App albums={RemoteData.ready()} onMount={() => {}} {...overrideProps} />
    )
  })

  it('notifies that it has mounted', () => {
    const onMountSpy = td.function()

    shallow(subject({ onMount: onMountSpy }))

    td.verify(onMountSpy())
  })

  it('initially renders a loading message', () => {
    const wrapper = shallow(subject({ albums: RemoteData.ready() }))

    expect(wrapper.contains('Loading...')).toBe(true)
  })

  it('renders a loading message when data is loading', () => {
    const wrapper = shallow(subject({ albums: RemoteData.loading() }))

    expect(wrapper.contains('Loading...')).toBe(true)
  })

  it('renders the albums when loaded', () => {
    const albums = [{}, {}]

    const wrapper = shallow(subject({ albums: RemoteData.success(albums) }))

    expect(wrapper.containsMatchingElement(<Albums albums={albums} />)).toBe(
      true,
    )
  })

  it('renders an error when data fails to load', () => {
    const error = new Error('No data')
    const wrapper = shallow(subject({ albums: RemoteData.fail(error) }))

    expect(wrapper.text()).toMatch(`Got an error: ${error.message}`)
  })

  it('renders a selected album', () => {
    const albums = [{}, {}]
    const selectedAlbum = {}

    const wrapper = shallow(
      subject({ selectedAlbum, albums: RemoteData.success(albums) }),
    )

    expect(
      wrapper.containsMatchingElement(<Album album={selectedAlbum} />),
    ).toBe(true)
  })
})
