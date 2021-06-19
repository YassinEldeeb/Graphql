import BlogType from '../../typeDefs/blogType'
import { GraphQLID } from 'graphql'
import Blog from '../../models/blog'

const blog = {
  type: BlogType,
  args: { _id: { type: GraphQLID } },
  async resolve(parent: any, { _id }: any) {
    // Get Blog from Mongo
    const blog = await Blog.findById(_id)
    return blog
  },
}

export default blog
