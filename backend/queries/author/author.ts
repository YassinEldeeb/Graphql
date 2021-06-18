import { GraphQLID } from 'graphql'
import AuthorType from '../../schemas/authorType'
import Author from '../../models/author'

const author = {
  type: AuthorType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, { id }: any) {
    // Get Author from Mongo
    const author = await Author.findById(id)
    return author
  },
}

export default author
