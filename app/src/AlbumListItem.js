import React from 'react'
import './AlbumListItem.module.css'

const AlbumListItem = ({ album, onSelectAlbum }) => (
  <div className="album-list-item" onClick={() => onSelectAlbum(album)}>
    <img src={album.coverUrl} alt="" />
    <h2 className="album-list-item__title">{album.title}</h2>
    <h3 className="album-list-item__artists">{album.artists.join(' - ')}</h3>
  </div>
)

export default AlbumListItem
