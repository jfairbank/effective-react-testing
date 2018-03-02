import React from 'react'
import { shallow } from 'enzyme'
import td from 'testdouble'
import * as RemoteData from './remoteData'
import App from './App'
import Loading from './Loading'
import Albums from './Albums'

describe('App unit', () => {
  let subject

  beforeEach(() => {
    subject = overrideProps => (
      <App albums={RemoteData.ready()} onMount={() => {}} {...overrideProps} />
    )
  })

  it('notifies that is has mounted', () => {
    const onMountSpy = td.function()

    shallow(subject({ onMount: onMountSpy }))

    td.verify(onMountSpy())
  })

  it('initially renders a loading message', () => {
    const wrapper = shallow(subject({ albums: RemoteData.ready() }))
    // Favor contains so not too coupled to implementation details
    // expect(wrapper.equals(<Loading />)).toBe(true)
    expect(wrapper.contains(<Loading />)).toBe(true)
  })

  it('renders a loading message when data is loading', () => {
    const wrapper = shallow(subject({ albums: RemoteData.loading() }))
    expect(wrapper.contains(<Loading />)).toBe(true)
  })

  it('renders the albums when loaded', () => {
    const albums = [{}, {}]

    // const wrapper = shallow(
    //   subject({ albums: RemoteData.success(albums) }),
    // ).find(Albums)

    const wrapper = shallow(subject({ albums: RemoteData.success(albums) }))

    // expect(wrapper.prop('albums')).toEqual(albums)
    expect(wrapper.contains(<Albums albums={albums} />)).toBe(true)
  })

  it('renders an error when data fails to load', () => {
    const error = new Error('No data')
    const wrapper = shallow(subject({ albums: RemoteData.fail(error) }))

    expect(wrapper.text()).toMatch(`Got an error: ${error.message}`)
  })

  // Low value test
  // it('passes along the filter value', () => {
  // });
})
