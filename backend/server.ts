import schema from './schema/schema'
import connectDB from './db/mongoose'
import authorLoader from './dataLoaders/authorLoader'
import blogLoader from './dataLoaders/blogLoader'
import { ApolloServer } from 'apollo-server-express'
import chalk from 'chalk'
import express from 'express'

connectDB()

const runServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => {
      return {
        authorLoader,
        blogLoader,
        reqRes: { req, res },
      }
    },
  })
  await server.start()

  const app: any = express()

  server.applyMiddleware({ app })

  const port = process.env.PORT

  await new Promise((resolve) => app.listen({ port }, resolve))
  console.log(chalk.yellow.bold.underline(`Server is running on port ${port}`))

  return { server, app }
}

runServer()
