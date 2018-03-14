import React from 'react'
import { shallow } from 'enzyme'
import AlbumList from 'src/components/AlbumList'
import AlbumListItem from 'src/components/AlbumListItem'
import renderer from 'react-test-renderer'

describe('AlbumList', () => {
  it('renders albums', () => {
    const albums = [
      { id: 1, title: 'Awesome Jazz', artists: ['Jane'] },
      { id: 2, title: 'Jazzy Fun', artists: ['Joe'] },
    ]

    function onSelectAlbum() {}

    const output = renderer.create(
      <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />,
    )

    expect(output).toMatchSnapshot()
  })
})
