import React from 'react'
import * as Filter from '../filter'
import * as Sorter from '../sorter'
import AlbumList from './AlbumList'
import * as styles from './Albums.module.css'

const FilterSection = ({ label, children }) => (
  <div className={styles.filterSection}>
    <div className={styles.label}>
      <label>{label}:</label>
    </div>

    {children}
  </div>
)

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
    <div className={styles.filterSections}>
      <FilterSection label="Search Artists">
        <input
          type="text"
          value={artistQuery}
          onChange={e => onSearchArtist(e.target.value)}
        />
      </FilterSection>

      <FilterSection label="Filter">
        <select
          value={filter}
          onChange={e => onFilter(e.target.value)}
          data-test="filter-by"
        >
          <option value={Filter.All}>All Albums</option>
          <option value={Filter.Liked}>Liked Albums</option>
          <option value={Filter.Disliked}>Disliked Albums</option>
        </select>
      </FilterSection>

      <FilterSection label="Sort By">
        <select
          value={sorter}
          onChange={e => onSortBy(e.target.value)}
          data-test="sort-by"
        >
          <option value={Sorter.Id}>Default</option>
          <option value={Sorter.Title}>Title</option>
          <option value={Sorter.Artist}>Artist</option>
        </select>
      </FilterSection>
    </div>

    <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />
  </div>
)

export default Albums
