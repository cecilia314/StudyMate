import dotenv from 'dotenv';
import express, { json } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { connect } from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { typeDefs } from './src/graphql/typeDefs.js';
import { resolvers } from './src/graphql/resolvers.js';

dotenv.config();

const app = express();
const PORT = 4000;
const MONGODB = process.env.MONGO_URI;
const httpServer = createServer(app);

connect(MONGODB)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 1 }));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();
  app.use('/graphql', json(), expressMiddleware(server));
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`)
  );
}

startServer();

process.removeAllListeners('warning');
