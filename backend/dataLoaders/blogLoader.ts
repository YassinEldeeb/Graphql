import DataLoader from 'dataloader'
import Blog from '../models/blog'

const blogLoader = new DataLoader(async (keys) => {
  const blogs = await Blog.find({ author: { $in: keys } })

  const blogMap: any = []
  blogs.forEach((blog: any) => {
    if (blogMap[blog.author]) {
      blogMap[blog.author].push(blog)
    } else {
      blogMap[blog.author] = [blog]
    }
  })

  return keys.map((e: any) => blogMap[e])
})

export default blogLoader
