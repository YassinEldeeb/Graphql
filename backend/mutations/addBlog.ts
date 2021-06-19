import BlogType from '../typeDefs/blogType'
import { GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql'
import Blog from '../models/blog'
import estimateReadingTime from '../utils/estimate-readingTime'

interface blog {
  title: string
  tags: [string]
  body: string
  author: string
  readingTime: string
}

const addBlog: any = {
  type: BlogType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, args: blog) {
    const readingDuration = estimateReadingTime(args.body)
    const blog = new Blog({ ...args, readingTime: readingDuration })
    await blog.save()

    return blog
  },
}

export default addBlog
