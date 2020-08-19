const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const schemaText = `
  schema {
    query: Query
  }

  type Query {
    Text: String
  }  
`;

const resolvers = {
  Query: {
    Text: () => 'text',
  },
};

const schema = makeExecutableSchema({
  typeDefs: [schemaText],
  resolvers,
});

const createGraphqlServer = () => new ApolloServer({
  schema,
  cors: { origin: false }
});

module.exports = { createGraphqlServer }
