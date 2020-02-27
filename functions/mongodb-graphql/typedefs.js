const { gql } = require("apollo-server-lambda");

module.exports = gql`
    type Post {
        _id: ID!
        title: String!
        content: String!
    }
    
    type Query {
        post(_id: ID!): Post
        posts: [Post!]!
    }
    
    type Mutation {
        createPost(title: String!, content: String!): Post!
    }
`;
