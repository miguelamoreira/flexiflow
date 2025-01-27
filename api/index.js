import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from
'@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { gql } from 'graphql-tag';
import { typeDefs } from './schemas/schema.js'
import { resolvers } from './resolvers/index.js'
import cors from 'cors';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    schema,
    plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
});

const startServer = async () => {
await server.start();
app.use('/graphql', expressMiddleware(server));

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
useServer({ schema }, wsServer);
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Servidor pronto em http://localhost:${PORT}/graphql`);
    });
};
startServer();
