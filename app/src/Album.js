import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { Like, Dislike } from './RatingIcon'
import './Album.module.css'

class Album extends Component {
  constructor(props) {
    super(props)

    this.state = { review: props.album.review }

    this.updateReview = this.updateReview.bind(this)
    this.onReview = debounce(this.onReview, 500)
  }

  onReview(review) {
    this.props.onReview(review)
  }

  updateReview(e) {
    const review = e.target.value
    this.setState({ review })
    this.onReview(review)
  }

  render() {
    const { album, onGoBack, onRate } = this.props
    const { review } = this.state

    return (
      <div className="album">
        <button className="album__go-back" onClick={onGoBack}>
          Go Back
        </button>

        <div className="album__content">
          <h1 className="album__title">{album.title}</h1>
          <h2 className="album__artists">{album.artists.join(' - ')}</h2>

          <div className="album__cover">
            <img src={album.coverUrl} alt="" />
          </div>

          <div className="album__ratings">
            <Like size="3x" albumRating={album.rating} onRate={onRate} />
            <Dislike size="3x" albumRating={album.rating} onRate={onRate} />
          </div>

          <div className="album__review">
            <textarea value={review} onChange={this.updateReview} />
          </div>
        </div>
      </div>
    )
  }
}

export default Album
