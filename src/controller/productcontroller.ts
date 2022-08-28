import { Request, Response } from "express";
import { createDetailProduct, createModelProduct, findAllDetailProduct, findAllProduct, findAllProductByID, findDetailProductByID, updateDetailProduct, deleteModelProduct, deleteDetailProduct, updateModelProduct, findModelProductByID, findAllDetailSameIDProduct } from '../DAO/productquery';
import { ModelProduct } from '../Model/ModelProduct';
import { DetailProduct } from '../Model/DetailProduct';
import bodyParser from 'body-parser';




export const getAllProduct=async (req:Request,res:Response)=>{
    try {
        let listModelProduct:Array<ModelProduct>=[]
        listModelProduct=await findAllProduct()
        console.log(listModelProduct)
        res.status(200).json(listModelProduct)
    } catch (error) {
        console.log(error)
    }
}

export const getProductByID=async (req:Request,res:Response)=>{
    try {
        let listDetailProduct: ModelProduct
        listDetailProduct=await findModelProductByID(Number(req.params.id))
        
        res.status(200).json(listDetailProduct)
    } catch (error) {
        console.log(error)
    }
}

export const AddModelProduct=async function(req,res){
    console.log(req.file)
    if(req.file){
          let img:string=req.file.filename
          let data=req.body
          data['img']=img
          let product:ModelProduct=Object.assign(new ModelProduct(),data)
          console.log(product)
          let dataupdate=await createModelProduct(product)

          res.json(dataupdate)
    }
  
}
export const UpdateModelProduct=async function(req,res){
    console.log(req.body)
    if(req.file){
        let img:string=req.file.filename
        let data=req.body
        data['img']=img
        data['ID_Product']=Number(req.params.id)
        let product:ModelProduct=Object.assign(new ModelProduct(),data)
        let datas=await updateModelProduct(product)
        console.log(product)
        res.json(data)
    }
}

export const getAllDetailProduct=async (req:Request,res:Response)=>{
    try {
        let listDetailProduct:Array<DetailProduct>=[]
        listDetailProduct=await findAllDetailProduct()
        console.log(listDetailProduct)
        res.status(200).json(listDetailProduct)
    } catch (error) {
        console.log(error)
    }
}
export const getAllDetailProductByIDProduct=async (req:Request,res:Response)=>{
    try {
        let listDetailProduct:Array<DetailProduct>=[]
        listDetailProduct=await  findAllDetailSameIDProduct(Number(req.params.id))
        console.log(listDetailProduct)
        res.status(200).json(listDetailProduct)
    } catch (error) {
        console.log(error)
    }
}
export const getDetailProductByID=async (req:Request,res:Response)=>{
    try {
        let modelProduct:DetailProduct
        modelProduct=await findDetailProductByID(Number(req.params.id))
        
        res.status(200).json(modelProduct)
    } catch (error) {
        console.log(error)
    }
}

export const AddDetailProduct=async function(req,res){
    if(req.file){
    let data=req.body
    data['img']=req.file.filename
    let product:DetailProduct=Object.assign(new DetailProduct(),data)
    let dataad=await createDetailProduct(product)
    console.log(product)
    res.json(data)
}
}
export const UpdateDetailProduct=async function(req,res){
    let product:DetailProduct=Object.assign(new DetailProduct(),req.body)
    let data=await updateDetailProduct(product)
    console.log(product)
    res.json(data)
}


export const deleteModel= async function(req,res){

    let result=await deleteModelProduct(Number(req.params.id))
    if(result)
        res.status(200).json({message:"Success"})
    else
         res.status(200).json({message:"Fail"})
}

export const deleteDetail= async function(req,res){
    try{
        let id= parseInt(req.params.id)
        let result=await deleteDetailProduct(id)
        if(result)
            res.status(200).json({message:"Success"})
        else
            res.status(404).json({message:"Fail"})
        }
        catch(err){
            res.status(404).json({message:"Fail"})
        }
}


