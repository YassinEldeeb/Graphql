import DataLoader from 'dataloader'
import Author from '../models/author'

const authorLoader = new DataLoader(async (keys) => {
  const authors = await Author.find({ _id: { $in: keys } })

  const authorMap: any = {}
  authors.forEach((author: any) => (authorMap[author._id] = author))

  return keys.map((e: any) => authorMap[e])
})

export default authorLoader
