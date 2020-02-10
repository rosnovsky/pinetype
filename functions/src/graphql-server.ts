import {ApolloServer} from 'apollo-server-cloud-functions';

import schema from './schema';
import resolvers from './resolvers';

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => ({
      headers: req.headers,
      req,
      res,
    }),
    introspection: true,
    playground: true,
    engine: {
      apiKey: "service:pinetype-notes:ydJpSbU88ufDB_8wXidYXw",
      endpointUrl: "https://us-central1-pinetype.cloudfunctions.net/api"
    }
  });

const handler = apolloServer.createHandler(
  {cors: {
    origin: '*',
    credentials: true,
  }}
);

export default handler;
