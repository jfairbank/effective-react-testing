import React from 'react'
import { mount, shallow } from 'enzyme'
import td from 'testdouble'
import Album from 'src/components/Album'
import * as Rating from 'src/rating'
import { Like } from 'src/components/RatingIcon'

describe('Album', () => {
  const album = {
    title: 'An Album',
    artists: ['Jane', 'Joe'],
    coverUrl: 'album.jpg',
    rating: Rating.Liked,
    reviews: ['Great', 'Awesome'],
  }

  it('displays an album title', () => {
    const wrapper = shallow(<Album album={album} />)

    expect(wrapper.contains('An Album')).toBe(true)
  })

  it('displays an album artists', () => {
    const wrapper = shallow(<Album album={album} />)

    expect(wrapper.contains('Jane - Joe')).toBe(true)
  })

  it('display an album cover', () => {
    const wrapper = shallow(<Album album={album} />)

    expect(wrapper.containsMatchingElement(<img src="album.jpg" />)).toBe(true)
  })

  it('can like an album', () => {
    const onRate = () => {}
    const wrapper = shallow(<Album album={album} onRate={onRate} />)

    expect(
      wrapper.containsMatchingElement(
        <Like albumRating={album.rating} onRate={onRate} />,
      ),
    ).toBe(true)

    // const onRate = td.function('onRate')
    // const notRatedAlbum = { ...album, rating: Rating.NotRated }
    // const wrapper = mount(<Album album={notRatedAlbum} onRate={onRate} />)

    // wrapper.find('[data-icon="thumbs-up"]').simulate('click')

    // td.verify(onRate(Rating.Liked))
  })

  it('can leave a review', () => {
    const onReview = td.function('onReview')
    const review = 'superb'

    const wrapper = shallow(<Album album={album} onReview={onReview} />)

    wrapper.find('[data-test="new-review"]').simulate('change', {
      target: { value: review },
    })

    expect(wrapper.find('[data-test="new-review"]').prop('value')).toEqual(
      review,
    )

    wrapper.find('[data-test="save-review"]').simulate('click')

    td.verify(onReview(review))
  })
})
