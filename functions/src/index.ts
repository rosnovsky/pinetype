const {https} = require('firebase-functions');
import handler from './graphql-server';
import admin from 'firebase-admin';

admin.initializeApp();

const api = https.onRequest(handler);

export {api};
