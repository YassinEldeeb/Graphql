import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  hearts: { type: Number },
  comments: [{ userId: { type: String }, comment: { type: String } }],
  readingTime: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
})

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog
