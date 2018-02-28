import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Maybe } from 'ramda-fantasy'
// import logo from './logo.svg'
// import './App.css'
import './Album.css'
import * as remoteData from './remoteData'
import * as actions from './actions'

const Loading = () => <div>Loading...</div>

const AlbumListItem = ({ album, onSelectAlbum }) => (
  <div className="albums-list__item" onClick={() => onSelectAlbum(album)}>
    <div>
      <img src={album.coverUrl} alt="" />
    </div>
    <div>{album.title}</div>
    <div>{album.artists.join(' - ')}</div>
  </div>
)

const AlbumsList = ({ albums, onSelectAlbum }) => (
  <ul className="albums-list">
    {albums.map(album => (
      <li key={album.id}>
        <AlbumListItem album={album} onSelectAlbum={onSelectAlbum} />
      </li>
    ))}
  </ul>
)

const Albums = ({
  albums,
  artistQuery,
  onSearchArtist,
  onSelectAlbum,
  onSortBy,
}) => (
  <div>
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

    <AlbumsList albums={albums} onSelectAlbum={onSelectAlbum} />
  </div>
)

const Album = ({ album, onGoBack }) => (
  <div>
    <button onClick={onGoBack}>Go Back</button>
    <div>{album.title}</div>
  </div>
)

class App extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return remoteData.check(
      {
        [remoteData.READY]: () => <Loading />,
        [remoteData.LOADING]: () => <Loading />,
        [remoteData.SUCCESS]: albums =>
          Maybe.isJust(this.props.selectedAlbum) ? (
            <Album
              album={this.props.selectedAlbum.value}
              onGoBack={this.props.onGoBack}
            />
          ) : (
            <Albums
              albums={albums}
              onSearchArtist={this.props.onSearchArtist}
              onSelectAlbum={this.props.onSelectAlbum}
              onSortBy={this.props.onSortBy}
            />
          ),
        [remoteData.ERROR]: () => <div>Got an error</div>,
      },
      this.props.albums,
    )
  }
}

const filterAndSortAlbums = (artistQuery, sorter, albums) =>
  // artistQuery
  //   ? remoteData.map(albums, albumList =>
  //       albumList.filter(album =>
  //         album.artists.some(artist =>
  //           new RegExp(artistQuery, 'i').test(artist),
  //         ),
  //       ),
  //     )
  //   : albums
  R.map(
    R.pipe(
      R.filter(
        R.pipe(
          R.prop('artists'),
          R.any(R.test(new RegExp(artistQuery.trim(), 'i'))),
        ),
      ),
      R.sortBy(R.prop(sorter)),
    ),
    albums,
  )

const mapStateToProps = ({ albums, artistQuery, selectedAlbum, sorter }) => ({
  artistQuery,
  selectedAlbum,
  sorter,
  albums: filterAndSortAlbums(artistQuery, sorter, albums),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onMount: actions.loadAlbums,
      onGoBack: actions.unselectAlbum,
      onSearchArtist: actions.searchArtist,
      onSelectAlbum: actions.selectAlbum,
      onSortBy: actions.sortBy,
    },
    dispatch,
  )

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <h1 className="App-title">Welcome to React</h1>
//   </header>
//   <p className="App-intro">
//     To get started, edit <code>src/App.js</code> and save to reload.
//   </p>
// </div>
