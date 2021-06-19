import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql'
import BlogType from './blogType'

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve({ _id: id }, args, { blogLoader }) {
        return blogLoader.load(id)
      },
    },
  }),
})

export default AuthorType
