import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import {graphqlHTTP} from 'express-graphql'
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './controller/typeDefs.js';
import { resolvers } from './controller/resolvers.js';
import path from 'path';
import  graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.js';

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const __dirname = path.resolve();

// CORS Policy
app.use(cors())
app.use(bodyParser.json())

// app.use('/public',express.static('./uploads'));

// Database Connection
connectDB(DATABASE_URL)

// JSON
// app.use(express.json())
// app.use(formData.parse());

// Load Routes
// app.use("/api/user", userRoutes)

// app.use('/graphql',
// graphqlHTTP({
//     typeDefs,resolvers,
//     graphiql:true
// }))

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.use(cors());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  //   await new Promise((r) => app.listen({ port: 4001 }, r));
  //   console.log(
  //     `🚀 Server ready at     http://localhost:4001${server.graphqlPath}`
  //   );
  app.listen({ port: 8000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:8000${server.graphqlPath}`
    );
  });
}
startServer();

