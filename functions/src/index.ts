import {https} from 'firebase-functions';
import handler from './graphql-server';

const api = https.onRequest(handler);

export {api};
