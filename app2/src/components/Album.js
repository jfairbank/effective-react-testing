import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { Like, Dislike } from './RatingIcon'
import * as styles from './Album.module.css'

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
      <div className={styles.album} data-id="album">
        <button className={styles.goBack} data-id="go-back" onClick={onGoBack}>
          Go Back
        </button>

        <div className={styles.content}>
          <h1 className={styles.title} data-id="title">
            {album.title}
          </h1>

          <h2 className={styles.artists} data-id="artists">
            {album.artists.join(' - ')}
          </h2>

          <div>
            <img src={album.coverUrl} alt="" />
          </div>

          <div className={styles.ratings}>
            <Like size="3x" albumRating={album.rating} onRate={onRate} />
            <Dislike size="3x" albumRating={album.rating} onRate={onRate} />
          </div>

          <div>
            <textarea
              value={review}
              data-id="album-review"
              onChange={this.updateReview}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Album
