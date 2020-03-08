const MongoClient = require("mongodb").MongoClient;
const encoding = require('encoding');
const URI = process.env.URL;
const DB_NAME = "pinetype";

let cachedDb = null;
module.exports = () => {
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
        return Promise.resolve(cachedDb);
    }
    return MongoClient.connect(URI, { useNewUrlParser: true }).then(client => {
        cachedDb = client.db(DB_NAME);
        console.log("connected");
        return cachedDb;
    });
};
