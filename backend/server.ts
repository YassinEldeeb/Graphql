import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schemas/schema'
import expressPlayground from 'graphql-playground-middleware-express'
import connectDB from './db/mongoose'
import authorLoader from './dataLoaders/authorLoader'
import blogLoader from './dataLoaders/blogLoader'

const app = express()

connectDB()

app.use(
  '/graphql',
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema,
      // Data Loaders in Context
      context: {
        authorLoader,
        blogLoader,
      },
    }
  })
)

app.use('/', expressPlayground({ endpoint: '/graphql' }))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
