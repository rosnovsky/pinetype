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
            .findById(args._id) 
            return res;
            }
        },
        Mutation: {
            createPost: async (root, args, context, info) => {
                const res = await db
                .collection("notes")
                .insertOne(args)
                console.log(res)
                return await db.collection("notes").findOne({_id: res.insertedId})
            },
        },
    };
}
