
import express from 'express'
import dotenv from 'dotenv'
import apiLogin from './api/apilogin';
import apiRegister from './api/apiregister'
import bodyParser from 'body-parser'
import cookieParser from  "cookie-parser"
import homeView from './routes/home'
import loginView from './routes/login'
import { viewEngine } from './setView';
import apiuser from './api/apiuser'
import profileView from './routes/profile'
import apiproduct from './api/apiproduct'
import admin from './routes/admin'
import apicart from './api/apicart'
import apicheckout from './api/apicheckout'
import product from './routes/product'
import cart from './routes/cart'
import checkout from './routes/checkout'
import apiorders from './api/apiorder'
import apiadlinuser from './api/apiadminuser'
dotenv.config()

const app=express()
viewEngine(app)
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/login',apiLogin)
app.use('/api/register',apiRegister)
app.use('/api/user',apiuser)
app.use('/api/adminuser',apiadlinuser)
app.use('',homeView)
app.use('/login',loginView)
app.use('/profile',profileView)
app.use('/api/product',apiproduct)
app.use('/admin',admin)
app.use('/api/cart',apicart)
app.use('/product',product)
app.use('/cart',cart)
app.use('/api/checkout',apicheckout)
app.use('/checkout',checkout)
app.use('/api/order',apiorders)

app.listen(process.env.PORT,()=>{
    console.log(`Connected http://localhost:${process.env.PORT}`)
})