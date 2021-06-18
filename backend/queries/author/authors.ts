import { GraphQLInt, GraphQLList } from 'graphql'
import AuthorType from '../../schemas/authorType'
import Author from '../../models/author'

const authors = {
  type: new GraphQLList(AuthorType),
  args: { limit: { type: GraphQLInt }, offset: { type: GraphQLInt } },
  async resolve(parent: any, { limit, offset }: any) {
    // Get Authors from Mongo
    const authors = await Author.find({})
      .limit(parseInt(limit ? limit : 0))
      .skip(parseInt(offset ? offset : 0))
    return authors
  },
}

export default authors
