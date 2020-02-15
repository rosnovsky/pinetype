import userSchema from './userSchema';
import postSchema from './postSchema';
import { gql } from 'apollo-server-micro';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, postSchema];
