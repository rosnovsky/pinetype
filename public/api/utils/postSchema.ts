import { gql } from 'apollo-server-micro';

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;
