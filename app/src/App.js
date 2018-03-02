import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Album from './Album'
import Albums from './Albums'
import * as RemoteData from './remoteData'
import * as actions from './actions'
import * as selectors from './selectors'

const Loading = () => <div>Loading...</div>

class App extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const {
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

    return RemoteData.check(
      {
        [RemoteData.Ready]: () => <Loading />,
        [RemoteData.Loading]: () => <Loading />,
        [RemoteData.Success]: albums =>
          selectedAlbum ? (
            <Album
              album={selectedAlbum}
              onGoBack={onGoBack}
              onRate={onRateAlbum}
              onReview={onReviewAlbum}
            />
          ) : (
            <Albums
              albums={albums}
              filter={filter}
              sorter={sorter}
              onFilter={onFilter}
              onSearchArtist={onSearchArtist}
              onSelectAlbum={onSelectAlbum}
              onSortBy={onSortBy}
            />
          ),
        [RemoteData.Fail]: () => <div>Got an error</div>,
      },
      this.props.albums,
    )
  }
}

const mapStateToProps = state => ({
  albums: selectors.filteredAndSortedAlbums(state),
  artistQuery: state.artistQuery,
  filter: state.filter,
  selectedAlbum: selectors.selectedAlbum(state),
  sorter: state.sorter,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFilter: actions.selectFilter,
      onGoBack: actions.unselectAlbum,
      onMount: actions.loadAlbums,
      onRateAlbum: actions.rateAlbum,
      onReviewAlbum: actions.reviewAlbum,
      onSearchArtist: actions.searchArtist,
      onSelectAlbum: actions.selectAlbum,
      onSortBy: actions.sortBy,
    },
    dispatch,
  )

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
