import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(
      chalk.cyan.underline.bold(
        `Database is connected on ${connect.connection.host}`
      )
    )
  } catch (error) {}
}

export default connectDB
