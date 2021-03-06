import React from 'react'
import { shallow } from 'enzyme'
import AlbumList from 'src/components/AlbumList'
import AlbumListItem from 'src/components/AlbumListItem'

describe('AlbumList', () => {
  it('renders albums', () => {
    const albums = [
      { id: 1, title: 'Awesome Jazz', artists: ['Jane'] },
      { id: 2, title: 'Jazzy Fun', artists: ['Joe'] },
    ]

    function onSelectAlbum() {}

    const wrapper = shallow(
      <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />,
    )

    albums.forEach(album => {
      expect(
        wrapper.contains(
          <AlbumListItem album={album} onSelectAlbum={onSelectAlbum} />,
        ),
      ).toBe(true)
    })
  })
})
