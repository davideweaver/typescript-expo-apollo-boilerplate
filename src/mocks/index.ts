import { SchemaLink } from 'apollo-link-schema';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';

// import { GraphQLDateTime } from 'graphql-custom-types';
const typeDefs = `
    scalar DateTime
    type Query {
        posts: [Post]
    }
    type Post {
        id: ID!,
        created: DateTime!,
        text: String!,
    }
    type Mutation {
        addPost(text: String!): Post
    }
`;

const posts = [{
    created: '2018-12-05T19:36:50.294Z',
    id: 1001,
    text: 'This is the first post',
}, {
    created: '2018-12-06T08:22:00.000Z',
    id: 1002,
    text: 'This is the second',
}];

const mocks = {
    DateTime: () => new Date().toISOString(),
    Mutation: () => ({
        addPost: (_root: unknown, { text }: { text: string }) =>
            posts.push({ text, id: Date.now(), created: new Date().toISOString() }),
    }),
    Query: () => ({
        posts: () => posts,
    }),
};

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ mocks, schema });

export const mockedLink = new SchemaLink({ schema });
