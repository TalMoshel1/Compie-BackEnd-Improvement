import mongoose from 'mongoose'


async function connectToDb() {

const DB_PASSWORD = process.env.DB_PASSWORD

    try {
      mongoose.connect(`mongodb+srv://talmoshel444:${DB_PASSWORD}@cluster0.64j9f3f.mongodb.net/?retryWrites=true&w=majority`)
      .then((res)=>{
        
        return res
      })
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  }


export default connectToDb