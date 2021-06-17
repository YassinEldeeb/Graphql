import connectDB from './db/mongoose'
import Blog from './models/blog'
import Author from './models/author'

// dummy data
const blogs: any = [
  {
    title: 'Javascript Tips & Hacks to save you alot of time.',
    tags: ['javascript', 'tips', 'beginners'],
    body: '<h1>Javascript Tips & Hacks to save you alot of time.</h1>',
    readingTime: '3 min',
  },
  {
    title: 'How to make an awesome github portofolio like a pro.',
    tags: ['github', 'portofolio', 'pro'],
    body: '<h1>How to make an awesome github portofolio like a pro.</h1>',
    readingTime: '6 min',
  },
  {
    title: 'Node.js Socket.io Realtime Chat app with React',
    tags: ['react', 'node.js', 'socket.io', 'chat'],
    body: '<h1>Node.js Socket.io Realtime Chat app with React</h1>',
    readingTime: '15 min',
  },
  {
    title: 'Dockerize your Node.js app',
    tags: ['docker', 'node.js'],
    body: '<h1>Dockerize your Node.js app</h1>',
    readingTime: '7 min',
  },
  {
    title: 'Scrape with Node.js and Puppeter',
    tags: ['scrape', 'node.js'],
    body: '<h1>Scrape with Node.js and Puppeter</h1>',
    readingTime: '25 min',
  },
]

const authors = [
  {
    name: 'Yassin Eldeeb',
    email: 'yassineldeeb94@gmail.com',
    age: 17,
  },
  {
    name: 'Yassin Maher',
    email: 'yassinmaher@gmail.com',
    age: 25,
  },
  {
    name: 'Youssef Dauod',
    email: 'yassindauod@gmail.com',
    age: 32,
  },
]

connectDB()

const deleteAndInsertData = async () => {
  try {
    await Author.deleteMany()
    await Blog.deleteMany()
    const insertedAuthors = await Author.insertMany(authors)
    blogs[0].author = insertedAuthors[0]._id
    blogs[1].author = insertedAuthors[1]._id
    blogs[2].author = insertedAuthors[2]._id
    blogs[3].author = insertedAuthors[2]._id
    blogs[4].author = insertedAuthors[1]._id
    await Blog.insertMany(blogs)
    process.exit()
  } catch (err: any) {
    throw new Error(err)
  }
}

deleteAndInsertData()
