import React from 'react'
import AlbumListItem from './AlbumListItem'
import * as styles from './AlbumList.module.css'

const AlbumList = ({ albums, onSelectAlbum }) => (
  <ul className={styles.albumList} data-id="album-list">
    {albums.map(album => (
      <li key={album.id}>
        <AlbumListItem album={album} onSelectAlbum={onSelectAlbum} />
      </li>
    ))}
  </ul>
)

export default AlbumList
