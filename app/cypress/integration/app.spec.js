describe('App', () => {
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
    patchAlbum({ rating: 0, reviews: [] })
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('displays a loading message', () => {
    cy.contains('Loading...')
  })

  context('Main page', () => {
    it('displays loaded albums', () => {
      const expectedAlbumTitles = [
        'Kind of Blue',
        'A Love Supreme',
        'Blue Train',
        'Mingus Ah Um',
        'The Complete Hot Five and Hot Seven Recordings',
        "The Jazz Giants '56",
      ]

      expectedAlbumTitles.forEach(title => {
        cy.get('[data-test="album-list"]').should('contain', title)
      })
    })

    it('searches for artists', () => {
      cy
        .contains('Search Artist')
        .get('input')
        .type('John Coltrane')

      cy
        .get('[data-test="album-list-item"]')
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

      cy.get('[data-test="sort-by"]').select('Title')

      expectedAlbumTitles.forEach((title, index) => {
        cy
          .get('[data-test="album-list-item"]')
          .eq(index)
          .find('[data-test="title"]')
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

      cy.get('[data-test="sort-by"]').select('Artist')

      expectedAlbumTitles.forEach((title, index) => {
        cy
          .get('[data-test="album-list-item"]')
          .eq(index)
          .find('[data-test="title"]')
          .should('contain', title)
      })
    })

    context('With a liked album', () => {
      beforeEach(() => {
        likeAlbum()
        cy.visit('/')
      })

      afterEach(() => {
        resetAlbum()
      })

      it('displays and filters liked albums', () => {
        cy
          .get(`[data-test="album-list-item"]:contains(${album.title})`)
          .find('[data-test="rating-like"]')

        cy.get('[data-test="filter-by"]').select('Liked Albums')

        cy
          .get('[data-test="album-list-item"]')
          .should('have.length', 1)
          .and('contain', album.artist)
          .and('contain', album.title)
      })
    })
  })

  context('Selected album page', () => {
    const selectedRatingPrefix = 'fas'

    beforeEach(() => {
      cy.contains('Blue Train').click()
    })

    afterEach(() => {
      resetAlbum()
    })

    it('displays album info', () => {
      cy.get('[data-test="album-list"]').should('not.exist')

      cy
        .get('[data-test="album"]')
        .should('contain', album.artist)
        .and('contain', album.title)
    })

    it('goes back to the list', () => {
      cy.get('[data-test="go-back"]').click()
      cy.get('[data-test="album"]').should('not.exist')
      cy.get('[data-test="album-list"]')
    })

    context('Rating an album', () => {
      it('likes an album', () => {
        // Like album
        cy
          .get('[data-test="rating-like"]')
          .should('not.have.attr', 'data-prefix', selectedRatingPrefix)
          .click()
          .should('have.attr', 'data-prefix', selectedRatingPrefix)

        // Rating persists
        cy.visit('/')
        cy.contains('Blue Train').click()

        cy
          .get('[data-test="rating-like"]')
          .should('have.attr', 'data-prefix', selectedRatingPrefix)
      })
    })

    context('Reviewing an album', () => {
      const review = 'Great album!'

      it('adds a review', () => {
        // Add review
        cy.get('[data-test="reviews"]').should('not.contain', review)
        cy.get('[data-test="new-review"]').type(review)
        cy.get('[data-test="save-review"]').click()
        cy.get('[data-test="new-review"]').should('not.contain', review)
        cy.get('[data-test="reviews"]').should('contain', review)

        // Review persists
        cy.visit('/')
        cy.contains('Blue Train').click()

        cy.get('[data-test="reviews"]').should('contain', review)
      })
    })
  })
})
