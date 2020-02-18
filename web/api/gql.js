const { ApolloServer, gql } = require('./node_modules/apollo-server-lambda');
const mongoose = require('mongoose');

var userModel;
var postModel;

const schemaIndex = () => {
    const Schema = mongoose.Schema;
    const postSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    });

    const userSchema = new Schema({
        name: {
            type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'post',
            },
            ],
        });
            
    userModel = mongoose.model('user', userSchema);
    postModel = mongoose.model('post', postSchema);
}

const url = 'mongodb+srv://gqlServer:M5u2cPyvnHPdmbHv@pinetype-or-us-sztbp.mongodb.net/test?retryWrites=true&w=majority';

const connection = async (url) => {
    const connect = () => {
        mongoose.connect(url, { useNewUrlParser: true });
        mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`))
    }
    const db = await connect(url);
}

schemaIndex();

module.exports = async (req, res) => {
    connection(url);

	const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
    }
    
    type Query {
        post(id: ID!): Post!
        posts: [Post!]!
    }
    
    type Mutation {
        createPost(title: String!, content: String!): Post!
    }

    type User {
        id: ID!
        name: String!
        posts: [Post!]!
    }

    type Token {
        token: String!
    }

    type UserQuery {
        user(id: ID!): User!
        login(name: String!, password: String!): Token!
    }

    type UserMutation {
        createUser(name: String!, password: String!): User!
    }
    `;

	const resolvers ={
        Query: {
            post: async (parent, { id }, { models: { postModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const post = await postModel.findById({ _id: id }).exec();
            return post;
            },
            posts: async (parent, args, { models: { postModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const posts = await postModel.find({ author: me.id }).exec();
            return posts;
            },
        },
        Mutation: {
            createPost: async (parent, { title, content }, { models: { postModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const post = await postModel.create({ title, content, author: me.id });
            return post;
            },
        },
        Post: {
            author: async ({ author }, args, { models: { userModel } }, info) => {
            const userPosts = await userModel.findById({ _id: author }).exec();
            return userPosts;
            },
        },
    };

	const server = new ApolloServer({typeDefs, resolvers, introspection: true, playground: true});
	const handler = server.createHandler();
	const callback = () => {
		console.log("callback");
	};

	return handler(req, res, callback);
};

