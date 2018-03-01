import React from 'react'
import AlbumList from './AlbumList'
import './Albums.module.css'

const Albums = ({
  albums,
  artistQuery,
  onSearchArtist,
  onSelectAlbum,
  onSortBy,
}) => (
  <div className="albums">
    <div>
      <input
        type="text"
        value={artistQuery}
        onInput={e => onSearchArtist(e.target.value)}
      />
    </div>

    <div>
      Sort By:
      <select onInput={e => onSortBy(e.target.value)}>
        <option value="id">Default</option>
        <option value="title">Title</option>
        <option value="artists">Artist</option>
      </select>
    </div>

    <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />
  </div>
)

export default Albums
