import { GraphQLID } from 'graphql'
import AuthorType from '../../typeDefs/authorType'
import Author from '../../models/author'

const author = {
  type: AuthorType,
  args: { _id: { type: GraphQLID } },
  async resolve(parent: any, { _id }: any) {
    // Get Author from Mongo
    const author = await Author.findById(_id)
    return author
  },
}

export default author
