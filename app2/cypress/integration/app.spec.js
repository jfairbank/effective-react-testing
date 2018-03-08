describe('app', () => {
  const album = {
    id: 11,
    artist: 'John Coltrane',
    title: 'Blue Train',
  }

  function patchAlbum(data = {}) {
    cy.request('PATCH', `http://localhost:3001/albums/${album.id}`, data)
  }

  function likeAlbum() {
    patchAlbum({ rating: 1 })
  }

  function resetAlbum() {
    patchAlbum({ rating: 0, review: '' })
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('displays a loading message', () => {
    cy.contains('Loading...')
  })

  describe('album list', () => {
    it('displays all albums initially', () => {
      const expectedAlbumTitles = [
        'Kind of Blue',
        'A Love Supreme',
        'Blue Train',
        'Mingus Ah Um',
        'The Complete Hot Five and Hot Seven Recordings',
        "The Jazz Giants '56",
      ]

      expectedAlbumTitles.forEach(title => {
        cy.get('[data-id="album-list"]').should('contain', title)
      })
    })

    it('searches for artists', () => {
      cy
        .contains('Search Artist')
        .get('input')
        .type('John Coltrane')

      cy
        .get('[data-id="album-list-item"]')
        .should('have.length', 2)
        .each($album => {
          expect($album.text()).to.contain('John Coltrane')
        })
    })

    it('sorts albums according to album title', () => {
      const expectedAlbumTitles = [
        'A Love Supreme',
        'Blue Train',
        'Kind of Blue',
        'Mingus Ah Um',
        'The Complete Hot Five and Hot Seven Recordings',
        "The Jazz Giants '56",
      ]

      cy
        .contains('Sort By')
        .find('select')
        .select('Title')

      expectedAlbumTitles.forEach((title, index) => {
        cy
          .get('[data-id="album-list-item"]')
          .eq(index)
          .find('[data-id="title"]')
          .should('contain', title)
      })
    })

    it('sorts albums according to artist', () => {
      const expectedAlbumTitles = [
        'Mingus Ah Um', // Charles Mingus
        'A Love Supreme', // John Coltrane
        'Blue Train', // John Coltrane
        "The Jazz Giants '56", // Lester Young...
        'The Complete Hot Five and Hot Seven Recordings', // Louis Armstrong
        'Kind of Blue', // Miles Davis
      ]

      cy
        .contains('Sort By')
        .find('select')
        .select('Artist')

      expectedAlbumTitles.forEach((title, index) => {
        cy
          .get('[data-id="album-list-item"]')
          .eq(index)
          .find('[data-id="title"]')
          .should('contain', title)
      })
    })

    describe('with a liked album', () => {
      beforeEach(() => {
        likeAlbum()
        cy.visit('/')
      })

      afterEach(() => {
        resetAlbum()
      })

      it('displays a liked icon on liked albums', () => {
        cy
          .get('[data-id="album-list-item"]:contains(Blue Train)')
          .find('[data-id="rating-like"]')
      })

      it('filters albums that were liked', () => {
        cy
          .contains('Filter')
          .find('select')
          .select('Liked Albums')

        cy
          .get('[data-id="album-list-item"]')
          .should('have.length', 1)
          .and('contain', album.artist)
          .and('contain', album.title)
      })
    })
  })

  describe('selecting an album', () => {
    const selectedRatingClass = 'rating-icon--selected'

    beforeEach(() => {
      cy.contains('Blue Train').click()
    })

    afterEach(() => {
      resetAlbum()
    })

    it('displays album info', () => {
      cy.get('[data-id="album-list"]').should('not.exist')

      cy
        .get('[data-id="album"]')
        .should('contain', album.artist)
        .and('contain', album.title)
    })

    it('goes back to the list', () => {
      cy.get('[data-id="go-back"]').click()
      cy.get('[data-id="album"]').should('not.exist')
      cy.get('[data-id="album-list"]')
    })

    it('likes and dislikes an album', () => {
      // Like the album
      cy
        .get('[data-id="rating-like"]')
        .should('not.have.class', selectedRatingClass)
        .click()
        .should('have.class', selectedRatingClass)

      // Dislike the album
      cy
        .get('[data-id="rating-dislike"]')
        .should('not.have.class', selectedRatingClass)
        .click()
        .should('have.class', selectedRatingClass)

      // Liked icon should not be selected
      cy
        .get('[data-id="rating-like"]')
        .should('not.have.class', selectedRatingClass)

      // Remove rating
      cy
        .get('[data-id="rating-dislike"]')
        .click()
        .should('not.have.class', selectedRatingClass)
    })

    it('ratings persist', () => {
      cy
        .get('[data-id="rating-like"]')
        .should('not.have.class', selectedRatingClass)
        .get('[data-id="rating-like"]')
        .click()

      cy.visit('/')
      cy.contains('Blue Train').click()

      cy
        .get('[data-id="rating-like"]')
        .should('have.class', selectedRatingClass)
    })

    it('leaves a persisted review', () => {
      const review = 'Great album!'

      // Add a review
      cy
        .get('[data-id="album-review"]')
        .type(review)
        .should('contain', review)

      // Reviews persist
      cy.wait(500).visit('/')
      cy.contains('Blue Train').click()

      cy.get('[data-id="album-review"]').should('contain', review)
    })
  })
})
