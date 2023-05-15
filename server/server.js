const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);

const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // adjust path as necessary

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// define the context function
const context = async ({ req }) => {
  let user = null;
  let token = req.headers.authorization || '';

  if (token) {
    token = token.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(token, 'your-secret-key'); // replace 'your-secret-key' with your actual secret key
      user = await User.findById(decodedToken._id);
    } catch (err) {
      console.error(err);
    }
  }

  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,  // provide the context function to the ApolloServer
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
