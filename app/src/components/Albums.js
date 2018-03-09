import React from 'react'
import * as Filter from '../filter'
import * as Sorter from '../sorter'
import AlbumList from './AlbumList'
import * as styles from './Albums.module.css'

const Albums = ({
  albums,
  artistQuery,
  filter,
  sorter,
  onFilter,
  onSearchArtist,
  onSelectAlbum,
  onSortBy,
}) => (
  <div className={styles.albums}>
    <div>
      Search Artist:
      <input
        type="text"
        value={artistQuery}
        onInput={e => onSearchArtist(e.target.value)}
      />
    </div>

    <div>
      Filter:
      <select onChange={e => onFilter(e.target.value)} value={filter}>
        <option value={Filter.All}>All Albums</option>
        <option value={Filter.Liked}>Liked Albums</option>
        <option value={Filter.Disliked}>Disliked Albums</option>
      </select>
    </div>

    <div>
      Sort By:
      <select
        onChange={e => onSortBy(e.target.value)}
        value={sorter}
        data-id="sort-by"
      >
        <option value={Sorter.Id}>Default</option>
        <option value={Sorter.Title}>Title</option>
        <option value={Sorter.Artist}>Artist</option>
      </select>
    </div>

    <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />
  </div>
)

export default Albums
