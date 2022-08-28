import { Request, Response } from "express";
import { createDetailProduct, createModelProduct, findAllDetailProduct, findAllProduct, findAllProductByID, findDetailProductByID, updateDetailProduct, deleteModelProduct, deleteDetailProduct, updateModelProduct } from '../DAO/productquery';
import { ModelProduct } from '../Model/ModelProduct';
import { DetailProduct } from '../Model/DetailProduct';
import bodyParser from 'body-parser';
import { addtoCart, editCart, findProductInCartByUsername, removeProductInCart } from '../DAO/cartquery';



export const getCart=async (req:Request,res:Response)=>{
    try {
        let username=req.username.toString()
      
            const listProductInCart= await findProductInCartByUsername(username)
            res.status(200).json(listProductInCart)
        }
     catch (error) {
        console.log(error)
    }
}
export const addCart=async (req:Request,res:Response)=>{
    try {
         
            let s=Object.assign(new DetailProduct,req.body)
            console.log(s)
            let status=await addtoCart(req.username,s,s.name)
            res.json(status)
    } catch (error) {
        console.log(error)
    }
}
export const updateCart=async (req:Request,res:Response)=>{
    try {
        
            let s=new DetailProduct()
            s.setNumbers(req.body.numbers)
            s.setId_detail(req.body.ID_detail)

            let status=await editCart(s,req.username)
            res.json(status)
    } catch (error) {
        console.log(error)
    }
}
export const deleteProductInCart=async (req:Request,res:Response)=>{
    try {
            console.log(req.body)
            let s=Object.assign(new DetailProduct,req.body)
            console.log(s)
            let status=await removeProductInCart(s,req.username)
            res.json(status)
    } catch (error) {
        console.log(error)
    }
}