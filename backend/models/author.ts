import mongoose, { Schema } from 'mongoose'

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
})

const Author = mongoose.model('Author', AuthorSchema)

export default Author
