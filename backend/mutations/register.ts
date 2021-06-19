import jwt from 'jsonwebtoken'
import Author from '../models/author'
import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import authenticatedAuthorType from '../typeDefs/authenticatedAuthorType'
import bcrypt from 'bcrypt'

interface args {
  name: string
  email: string
  password: string
}

const register: any = {
  type: authenticatedAuthorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_: any, args: args, { reqRes: { req, res } }: any) {
    const hashedPass = bcrypt.hashSync(args.password, 10)
    const author = new Author({ ...args, password: hashedPass })
    const token = jwt.sign(
      { _id: author._id.toString() },
      process.env.JWT_SECRET as string
    )
    await author.save()

    res.status(201)
    return { ...author.toObject(), token }
  },
}

export default register
