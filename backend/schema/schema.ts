import { GraphQLObjectType, GraphQLSchema } from 'graphql'
//Mutations
import addBlog from '../mutations/addBlog'
import register from '../mutations/register'
import login from '../mutations/login'
//Queries
import blogQuery from '../queries/blog/blog'
import authorQuery from '../queries/author/author'
import blogsQuery from '../queries/blog/blogs'
import authorsQuery from '../queries/author/authors'

const RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    blog: blogQuery,
    author: authorQuery,
    blogs: blogsQuery,
    authors: authorsQuery,
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBlog,
    register,
    login,
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
