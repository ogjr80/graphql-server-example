import { GraphQLServer } from 'graphql-yoga'
import { Graphcool } from 'graphcool-binding'
import { importSchema } from 'graphql-import'
import { resolvers, fragmentReplacements } from './resolvers'

const typeDefs = importSchema('./src/schemas/app.graphql')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      schema: './src/schemas/database.graphql',
      fragmentReplacements,
      endpoint: process.env.GRAPHCOOL_ENDPOINT,
      secret: process.env.GRAPHCOOL_SECRET,
    }),
  }),
  options: { port: 5000 },
})

server.start(() => console.log('Server is running on http://localhost:5000'))
