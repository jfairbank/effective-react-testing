import React, { Component } from 'react'
import { Like, Dislike } from './RatingIcon'
import * as styles from './Album.module.css'

class Album extends Component {
  constructor(props) {
    super(props)

    this.state = { newReview: '' }

    this.updateNewReview = this.updateNewReview.bind(this)
    this.saveReview = this.saveReview.bind(this)
  }

  saveReview() {
    this.props.onReview(this.state.newReview)
    this.setState({ newReview: '' })
  }

  updateNewReview(e) {
    this.setState({ newReview: e.target.value })
  }

  canSaveReview() {
    return this.state.newReview.trim() !== ''
  }

  render() {
    const { album, onGoBack, onRate } = this.props
    const { newReview } = this.state

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

          <div className={styles.info}>
            <div>
              <img src={album.coverUrl} alt="" />
            </div>

            <div className={styles.ratings}>
              <Like size="4x" albumRating={album.rating} onRate={onRate} />
              <Dislike size="4x" albumRating={album.rating} onRate={onRate} />
            </div>
          </div>

          <div className={styles.reviews} data-id="reviews">
            <div className={styles.reviewList}>
              <h4>Reviews:</h4>

              <ul>
                {album.reviews.map((review, i) => (
                  <li className={styles.review} key={i} data-id="review">
                    {review}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.newReview}>
              <textarea
                value={newReview}
                onChange={this.updateNewReview}
                data-id="new-review"
              />

              <button
                disabled={!this.canSaveReview()}
                onClick={this.saveReview}
                data-id="save-review"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Album
