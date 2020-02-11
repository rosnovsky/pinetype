//This whole thing is an ugly stub for API authentication. It will change.

const admin = require('firebase-admin')
const jwtDecode = require('jwt-decode')
const serviceAccount = require('../pinetype-firebase-adminsdk-rjbkr-db3db534f5.json')

const getCustomToken = async (sub: any) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  const firebaseToken = await admin.auth().createCustomToken(sub)
  return firebaseToken
}

const setCustomTokenFirebase = async (event: any) => {
  const { headers } = event
  const { authorization } = headers
  const jtwToken = authorization.split('Bearer')[1]
  const jwtDecoded = jwtDecode(jtwToken)
  const token = await getCustomToken(jwtDecoded['sub'])
  console.log(token)
  return { token }
}

const auth = async (event: any) => {
  const { token } = await setCustomTokenFirebase(event)
  return token;
};

export default auth;
