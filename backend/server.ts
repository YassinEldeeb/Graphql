import schema from './schemas/schema'
import connectDB from './db/mongoose'
import authorLoader from './dataLoaders/authorLoader'
import blogLoader from './dataLoaders/blogLoader'
import { ApolloServer } from 'apollo-server'
import chalk from 'chalk'

connectDB()

const server = new ApolloServer({
  schema,
  context: { authorLoader, blogLoader },
})

const port = process.env.PORT

server.listen(port, () => {
  console.log(chalk.yellow.bold.underline(`Server is running on port ${port}`))
})
