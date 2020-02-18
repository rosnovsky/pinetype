const { gql } = require("apollo-server-lambda");

module.exports = gql`
    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }
    
    type Query {
        post(_id: ID!): Post!
        posts: [Post!]!
        allPosts: [Post]
    }

    input PostInput {
        content: String
        author: String
    }
    
    type Mutation {
        createPost(input: PostInput): Post!
    }

    type User {
        id: ID!
        name: String!
        posts: [Post!]!
    }

    type Token {
        token: String!
    }

    type UserQuery {
        user(id: ID!): User!
        login(name: String!, password: String!): Token!
    }

    type UserMutation {
        createUser(name: String!, password: String!): User!
    }
`;
