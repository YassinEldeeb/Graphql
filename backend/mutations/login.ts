import jwt from 'jsonwebtoken'
import Author from '../models/author'
import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import authenticatedAuthorType from '../typeDefs/authenticatedAuthorType'
import bcrypt from 'bcrypt'

interface userCredentials {
  email: string
  password: string
}

const login: any = {
  type: authenticatedAuthorType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    _: any,
    { email, password }: userCredentials,
    { reqRes: { req, res } }: any
  ) {
    // Find email if it exists
    const author = await Author.findOne({ email })
    if (!author) {
      res.status(400)
      throw new Error('No Account with this email!')
    }

    // Check password
    const isMatch = await bcrypt.compare(password, author.password)
    if (!isMatch) {
      res.status(400)
      throw new Error('Unable to login!!')
    }

    // Gen a token if everything is ok!
    const token = jwt.sign(
      { _id: author._id.toString() },
      process.env.JWT_SECRET as string
    )
    res.status(200)
    return { ...author.toObject(), token }
  },
}

export default login
