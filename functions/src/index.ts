import {https} from 'firebase-functions';
import handler from './graphql-server';
import auth0 from './auth';

const api = https.onRequest(handler);

// This endpoint below is an ugly stub for API authentication
const auth = https.onRequest(async (req, res) => {
    res.send("Here's you token. Happy now? "+ await auth0(req));
});

export {api, auth};
