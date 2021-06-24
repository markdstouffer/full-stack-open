import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

export const EDIT_BORN = gql`
mutation editBornYear($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
  }
}
`