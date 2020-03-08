const ObjectId = require('mongodb').ObjectId;

module.exports = db => {
    return {
        Query: {
        posts: async () => await db
            .collection("notes")
            .find()
            .toArray(),
        post: async (root, args, context, info) => {
            const res = await db
            .collection("notes")
            .findOne(ObjectId(args._id)) 
            return res;
            }
        },
        Mutation: {
            createPost: async (root, args, context, info) => {
                const res = await db
                .collection("notes")
                .insertOne(args)
                return await db.collection("notes").findOne({_id: res.insertedId})
            },
            updatePost: async(root, args, input, info) => {
                console.log(args.input)
                const res = await db
                .collection("notes")
                .findOneAndUpdate({"_id": ObjectId(args._id)}, { $set: args.input })
                console.log(res)
                return await db.collection("notes").findOne(ObjectId(args._id))
            }
        },
    };
}
