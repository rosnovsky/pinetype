// import { NowRequest, NowResponse } from '@now/node';
// import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-micro';
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
import schema from './utils/schemaIndex';
import resolvers from './utils/resolversIndex';
import './utils/mongoConfig';

import userModel from './utils/userModel';
import postModel from './utils/postModel';

module.exports = async (req: any, res: any) => {

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
        context: async ({ req: NowRequest, res: NowResponse }) => {
        const token = req.headers.authorization;
        console.log(req.headers.authorization);
        const user = new Promise((resolve: any, reject: any) => {
            jwt.verify(token, getKey, options, (err: any, decoded: any) => {
            if(err){
                return reject(err);
            }
            return resolve(decoded.email);
            })

        })
        return {
            headers: req.headers,
            req,
            res,
            user,
            models: {
                userModel,
                postModel,
         }};
        },
        introspection: true,
        playground: true,
        engine: {
        apiKey: "service:pinetype-notes:ydJpSbU88ufDB_8wXidYXw",
        endpointUrl: "https://pinetype-test.now.sh/api/gql"
        }
    });

    const handler = apolloServer.createHandler();

	// const callback = () => {
	// 	client.close;
	// };

	return handler(req, res);
}
