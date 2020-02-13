import {ApolloServer } from 'apollo-server-cloud-functions';
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('./mongoConfig');

import schema from './schema';
import resolvers from './resolvers';

const client = jwksClient({
  jwksUri: `https://auth.rosnovsky.us/.well-known/jwks.json`
});

function getKey(header: any, cb: any){
  client.getSigningKey(header.kid, function(err: Error, key: any) {
    const SigningKey = key.publicKey || key.rsaPublicKey;
    cb(null, SigningKey);
  })
}

const options = {
  audience: 'https://us-central1-pinetype.cloudfunctions.net/api',
  issuer: 'https://rosnovsky.auth0.com/',
  algorithms: ['RS256']
};

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
      const token = req.header.authorization;
      console.log(req.headers, token);
      const user = new Promise((resolve: any, reject: any) => {
        jwt.verify(token, getKey, options, (err: any, decoded: any) => {
          if(err){
            return reject(err);
          }
          return resolve(decoded.email);
        })

      })
      return { user,
        headers: req.headers,
        req,
        res };
    },
    introspection: true,
    playground: true,
    engine: {
      apiKey: "service:pinetype-notes:ydJpSbU88ufDB_8wXidYXw",
      endpointUrl: "https://us-central1-pinetype.cloudfunctions.net/api"
    }
  });

const handler = apolloServer.createHandler(
  {
    cors: {
      origin: '*',
      credentials: true,
    }
  }
);

export default handler;
