import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} from 'graphql'
import Blog from '../models/blog'
import Author from '../models/author'
import BlogType from './blogType'
import AuthorType from './authorType'

const RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }, _) {
        // Get Blog from Mongo
        const blog = await Blog.findById(id)

        return blog
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        // Get Author from Mongo
        const author = await Author.findById(id)
        return author
      },
    },
    blogs: {
      type: new GraphQLList(BlogType),
      args: { limit: { type: GraphQLInt }, offset: { type: GraphQLInt } },
      async resolve(parent, { limit, offset }) {
        // Get Blogs from Mongo
        const blogs = await Blog.find({})
          .limit(parseInt(limit ? limit : 0))
          .skip(parseInt(offset ? offset : 0))

        return blogs
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: { limit: { type: GraphQLInt }, offset: { type: GraphQLInt } },
      async resolve(parent, { limit, offset }) {
        // Get Authors from Mongo
        const authors = await Author.find({})
          .limit(parseInt(limit ? limit : 0))
          .skip(parseInt(offset ? offset : 0))
        return authors
      },
    },
  },
})

export default new GraphQLSchema({
  query: RootQuery,
})
