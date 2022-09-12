const express=require('express')
require('dotenv').config()
const {connectDB}=require('./config/db')
const userRoutes=require('./mrc/user/user.route')
const orderRoutes=require('./mrc/order/order.route')
const productRoutes=require('./mrc/product/product.route')
const {errorHandler}=require('./middleware/errorMiddleware')
const path=require('path')

connectDB()

const app=express()
app.use(express.json())


app.use('/users',userRoutes)
app.use('/orders',orderRoutes)
app.use('/products',productRoutes)




app.listen(process.env.PORT,()=>console.log(`server started at ${process.env.PORT}`))

app.use(errorHandler)