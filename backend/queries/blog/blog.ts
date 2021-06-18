import BlogType from '../../schemas/blogType'
import { GraphQLID } from 'graphql'
import Blog from '../../models/blog'

const blog = {
  type: BlogType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, { id }: any) {
    // Get Blog from Mongo
    const blog = await Blog.findById(id)
    return blog
  },
}

export default blog
