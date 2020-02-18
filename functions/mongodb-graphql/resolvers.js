module.exports = db => ({
    Query: {
    allPosts: async () => await db
        .collection("notes")
        .find()
        .toArray()
    },
    Mutation: {
        createPost: async (content) => 
        await db 
        .collection("notes")
        .insertOne(content)
    },
});

