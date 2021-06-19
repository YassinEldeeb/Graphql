import mongoose, { Schema } from 'mongoose'

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: {
      type: String,
      minlength: 7,
      required: true,
      validate(value: string) {
        if (value.toLowerCase().includes('password')) {
          throw new Error(
            "Password can't contain any sort of 'password' keyword"
          )
        }
      },
    },
  },
  { timestamps: true }
)

const Author = mongoose.model('Author', AuthorSchema)

export default Author
