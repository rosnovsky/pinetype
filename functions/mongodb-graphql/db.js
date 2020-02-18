const MongoClient = require("mongodb").MongoClient;
const URI = "mongodb+srv://gqlServer:M5u2cPyvnHPdmbHv@pinetype-or-us-sztbp.mongodb.net/pinetype";
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
