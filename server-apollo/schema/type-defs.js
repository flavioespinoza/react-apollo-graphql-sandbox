const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie
  }

  # MUTATION and INPUT
  input UserCreateInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  input UserUsernameUpdateInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    userCreate(input: UserCreateInput!): User!
    userUsernameUpdate(input: UserUsernameUpdateInput!): User!
    userDelete(id: ID!): User!
  }

  enum Nationality {
    UNITED_STATES
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }
`;

module.exports = { typeDefs };
