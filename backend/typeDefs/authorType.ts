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
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve({ _id }: any, _: any, { blogLoader }: any) {
        return blogLoader.load(_id)
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
})

export default AuthorType
