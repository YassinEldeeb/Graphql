import { GraphQLList, GraphQLInt } from 'graphql'
import BlogType from '../../typeDefs/blogType'
import Blog from '../../models/blog'

const blogs = {
  type: new GraphQLList(BlogType),
  args: { limit: { type: GraphQLInt }, offset: { type: GraphQLInt } },
  async resolve(parent: any, { limit, offset }: any) {
    // Get Blogs from Mongo
    const blogs = await Blog.find({})
      .limit(parseInt(limit ? limit : 0))
      .skip(parseInt(offset ? offset : 0))

    return blogs
  },
}

export default blogs
