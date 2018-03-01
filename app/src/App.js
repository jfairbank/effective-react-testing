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
    return RemoteData.check(
      {
        [RemoteData.Ready]: () => <Loading />,
        [RemoteData.Loading]: () => <Loading />,
        [RemoteData.Success]: albums =>
          this.props.selectedAlbum ? (
            <Album
              album={this.props.selectedAlbum}
              onGoBack={this.props.onGoBack}
              onRate={this.props.onRateAlbum}
            />
          ) : (
            <Albums
              albums={albums}
              onSearchArtist={this.props.onSearchArtist}
              onSelectAlbum={this.props.onSelectAlbum}
              onSortBy={this.props.onSortBy}
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
  selectedAlbum: selectors.selectedAlbum(state),
  sorter: state.artistQuery,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onMount: actions.loadAlbums,
      onGoBack: actions.unselectAlbum,
      onSearchArtist: actions.searchArtist,
      onSelectAlbum: actions.selectAlbum,
      onSortBy: actions.sortBy,
      onRateAlbum: actions.rateAlbum,
    },
    dispatch,
  )

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
