import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as selectors from '../selectors'
import App from './App'

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
