import React, { Component } from 'react'
import Album from './Album'
import Albums from './Albums'
import * as RemoteData from '../remoteData'

class App extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const {
      albums,
      artistQuery,
      filter,
      selectedAlbum,
      sorter,
      onFilter,
      onGoBack,
      onRateAlbum,
      onReviewAlbum,
      onSearchArtist,
      onSelectAlbum,
      onSortBy,
    } = this.props

    switch (RemoteData.status(albums)) {
      case RemoteData.Ready:
      case RemoteData.Loading:
        return <div>Loading...</div>

      case RemoteData.Success:
        return selectedAlbum ? (
          <Album
            album={selectedAlbum}
            onGoBack={onGoBack}
            onRate={onRateAlbum}
            onReview={onReviewAlbum}
          />
        ) : (
          <Albums
            albums={RemoteData.payload(albums)}
            artistQuery={artistQuery}
            filter={filter}
            sorter={sorter}
            onFilter={onFilter}
            onSearchArtist={onSearchArtist}
            onSelectAlbum={onSelectAlbum}
            onSortBy={onSortBy}
          />
        )

      case RemoteData.Fail:
        return <div>Got an error: {RemoteData.error(albums).message}</div>

      default:
        return null
    }
  }
}

export default App
