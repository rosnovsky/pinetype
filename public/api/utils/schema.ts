const {gql} = require('apollo-server-cloud-functions');

const schema = gql`
  scalar Date
  scalar Geopoint

  type User {
    id: ID!
    name: String!
    email: String!
    birthday: Date
    location: Geo
    avatar: String
    slug: String
    notes: [Note]
  }
  
  type Geo {
    coordinates: Geopoint
    name: String
  }

  type Note {
    id: ID!
    userId: ID
    user: User
    text: String!
    NoteMetadata: NoteMetadata
  }

  type NoteMetadata {
    noteId: ID
    date: Date
    title: String!
    location: [Geo]
    weather: Weather
    sentiment: Float
    typingPattern: [TypingPattern]
  }

  type Weather {
    date: Date!
    location: Geo
    high: Float
    low: Float 
    sky: String
    wind: String
    pressure: Int
  }

  type TypingPattern {
    paragraphId: Int
    speed: Float
  }
  
  type Query {
    notes: [Note]
    user(id: String!): User
  }
`;

export default schema;
