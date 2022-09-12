const  mongoose=require('mongoose')

const connectDB=async()=>{
   try {
    const conn=await mongoose.connect(process.env.MONGO_URL)
    console.log(`db connected at ${conn.connection.host}`)

   } catch (error) {
    console.log('Error on connection')
   }
}

module.exports={connectDB}