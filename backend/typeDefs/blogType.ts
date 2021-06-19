import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql'
import AuthorType from './authorType'

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    body: { type: GraphQLString },
    readingTime: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve({ author }, args, { authorLoader }: any) {
        return authorLoader.load(author)
      },
    },
  }),
})

export default BlogType
