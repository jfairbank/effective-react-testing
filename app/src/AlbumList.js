import React from 'react'
import AlbumListItem from './AlbumListItem'
import './AlbumList.module.css'

const AlbumList = ({ albums, onSelectAlbum }) => (
  <ul className="album-list" data-id="album-list">
    {albums.map(album => (
      <li key={album.id}>
        <AlbumListItem album={album} onSelectAlbum={onSelectAlbum} />
      </li>
    ))}
  </ul>
)

export default AlbumList
