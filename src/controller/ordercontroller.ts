import { Request, Response } from "express";
import { createOrders, deleteOrder, findAllOrder, findOrderByUsername, updateOrder } from "../DAO/orderquery";
import { Need, createOrderModel } from '../Model/createOrder';
export const getOderUser=async (req:Request,res:Response)=>{
    try {
        let username:string=req.username;
        const listOrder:any=await findOrderByUsername(username)
        if(listOrder.length>0)
            res.status(200).json(listOrder)
        else
            res.status(200).json("Không có đơn hàng")

    } catch (error) {
        console.log(error)
    }
}
export const getAllOder=async (req:Request,res:Response)=>{
    try {
    
        const listOrder:any=await findAllOrder()
        if(listOrder.length>0)
            res.status(200).json(listOrder)
        else
            res.status(200).json("Không có đơn hàng")

    } catch (error) {
        console.log(error)
    }
}
export const createOrder=async (req:Request,res:Response)=>{
    try {
        let username=req.username;
        let dataorder=req.body;
        let createorder:createOrderModel=new createOrderModel()
        createorder.setUsername(username)
        createorder.setAddress(dataorder.address)
        createorder.setTotalprice(dataorder.totalprice)
        let listNeed:Array<Need>=[]
        for(let i=0;i<dataorder.data.length;i++){
                listNeed.push(new Need(dataorder.data[i].ID_Productdetail,dataorder.data[i].number))
        }
        createorder.setList(listNeed)
        let yourDate = new Date()
        createorder.setDateOrder(yourDate.toISOString().split('T')[0])
        let message=await createOrders(createorder)
        res.json(message)
    } catch (error) {
        console.log(error)
    }
}

export const authenOrder=async (req:Request,res:Response)=>{
        try {
            let id_order=Number(req.body.id)
            let username=req.username
            let message:any=await updateOrder(username,id_order)
            res.status(200).json(message)
        } catch (error) {
            console.log(error)
        }
}
export const cancleOrder=async (req:Request,res:Response)=>{
    try {
        let id_order=Number(req.body.id)
        let username=req.username
        let message:any=await deleteOrder(username,id_order)
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
    }
}