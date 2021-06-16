//Test for branch commit
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mark Stouffer',
      username: 'himarks',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const otherUser = {
      name: 'Shakib Rahman',
      username: 'impact',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('himarks')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('Mark Stouffer logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('himarks')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'himarks', password: 'secret' })
    })

    it('a blog can be created', function() {
      cy.createBlog({
        title: 'Blog created by cypress',
        author: 'Mark Stouffer',
        url: 'cypress.com'
      })
      cy.contains('Blog created by cypress')
    })

    describe('and one blog has been created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Test blog',
          author: 'Mark Stouffer',
          url: 'cypress.com'
        })
      })

      it('a user can like the blog', function() {
        cy.get('#showButton').click()
        cy.get('#likeButton').click()
        cy.contains('Likes: 1')
      })

      it('user who created the blog can delete it', function() {
        cy.get('#showButton').click()
        cy.get('#deleteButton').click()
        cy.get('html').should('not.contain', 'Test blog')
      })

      it('any other user cannot delete it', function() {
        cy.get('#logoutButton').click()
        cy.login({ username: 'impact', password: 'secret' })
        cy.get('#showButton').click()
        cy.get('#deleteButton').should('not.exist')
      })
    })
    describe('and many blogs have been created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Should be number 4',
          author: 'Mark',
          url: 'mark.com',
          likes: 0
        })
        cy.createBlog({
          title: 'Should be number 3',
          author: 'Mark',
          url: 'mark.com',
          likes: 2
        })
        cy.createBlog({
          title: 'Should be number 1',
          author: 'Mark',
          url: 'mark.com',
          likes: 6
        })
        cy.createBlog({
          title: 'Should be number 2',
          author: 'Mark',
          url: 'mark.com',
          likes: 4
        })
      })

      it('the blogs are in order', function() {
        cy.contains('number 1').parent().find('button').click()
        cy.contains('number 2').parent().find('button').click()
        cy.contains('number 3').parent().find('button').click()
        cy.contains('number 4').parent().find('button').click()
        cy.get('.likesSpan')
          .then(($els) => {
            return Cypress.$.makeArray($els).map((el) => el.innerText)
          })
          .should('deep.equal', ['6', '4', '2', '0'])
      })
    })
  })
})