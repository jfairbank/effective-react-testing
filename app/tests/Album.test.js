import React from 'react'
import { mount, shallow, render } from 'enzyme'
import td from 'testdouble'
import Album from 'src/components/Album'
import { Like } from 'src/components/RatingIcon'
import * as Rating from 'src/rating'

jest.mock('lodash/debounce', () => fn =>
  function(...args) {
    return fn.apply(this, args)
  },
)

describe('Album', () => {
  const baseAlbum = {
    title: 'An Album',
    artists: ['Jane', 'Joe'],
    coverUrl: 'album.jpg',
    rating: Rating.Liked,
  }

  function noop() {}

  const subject = overrideProps => (
    <Album
      album={baseAlbum}
      onGoBack={noop}
      onRate={noop}
      onReview={noop}
      {...overrideProps}
    />
  )

  it('displays the album title', () => {
    const wrapper = shallow(subject())

    expect(wrapper.find('h1').text()).toEqual('An Album')
    expect(wrapper.find('[data-id="title"]').contains('An Album')).toBe(true)

    expect(wrapper.contains('An Album')).toBe(true)
  })

  it('displays the artist names', () => {
    const wrapper = shallow(subject())

    expect(wrapper.find('h2').text()).toEqual('Jane - Joe')
    // prettier-ignore
    expect(wrapper.find('[data-id="artists"]').contains('Jane - Joe')).toBe(true)

    expect(wrapper.contains('Jane - Joe')).toBe(true)
  })

  it('displays the album cover', () => {
    const wrapper = shallow(subject())

    // expect(wrapper.contains(<img src="album.jpg" alt="" />)).toBe(true)
    expect(wrapper.containsMatchingElement(<img src="album.jpg" />)).toBe(true)
  })

  // If TDD, then maybe at this point, write test and copy in more robust implementation
  // Talk about feels like coupling concern, so we could use full mount
  it('can like an album', () => {
    const wrapper = shallow(subject())

    expect(
      wrapper.containsMatchingElement(
        <Like albumRating={baseAlbum.rating} onRate={noop} />,
      ),
    ).toBe(true)

    // Alternative but more of an integration test at this point
    // If implementation of Like changes, then this test could break too
    // const onRateSpy = td.function('onRate')
    // const album = { ...baseAlbum, rating: Rating.NotRated }
    // const wrapper2 = mount(subject({ album, onRate: onRateSpy }))

    // wrapper2.find('[data-icon="thumbs-up"]').simulate('click')

    // td.verify(onRateSpy(Rating.Liked))
  })

  it('can leave a review', () => {
    // const wrapper = shallow(subject())
    // const instance = wrapper.setState({ review: 'great' }).instance()

    // // Technically, this is the subject now
    // // This approach is brittle and reaches to much into implementation details
    // wrapper.containsMatchingElement(
    //   <textarea
    //     value={instance.state.view}
    //     onChange={instance.updateReview}
    //   />,
    // )

    const onReviewSpy = td.function('onReview')
    const wrapper = shallow(subject({ onReview: onReviewSpy }))

    wrapper.find('textarea').simulate('change', { target: { value: 'great' } })
    // prettier-ignore
    expect(
      wrapper.containsMatchingElement(<textarea value="great" />),
    ).toBe(
      true,
    )
    // Using jest-enzyme matcher
    // expect(wrapper.find('textarea')).toHaveProp('value', 'great')

    // Alternative if we don't want to couple to textarea
    // wrapper
    //   .find('[data-id="album-review"]')
    //   .simulate('change', { target: { value: 'great' } })

    // expect(wrapper.find('[data-id="album-review"]').prop('value')).toEqual(
    //   'great',
    // )
    // Using jest-enzyme matcher
    // expect(wrapper.find('[data-id="album-review"]')).toHaveProp(
    //   'value',
    //   'great',
    // )

    td.verify(onReviewSpy('great'))
  })
})
