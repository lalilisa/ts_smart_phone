


import { Request, Response } from "express"
import { craeteCheckout, getCheckout } from "../DAO/checkoutquery"
import { Checkout } from "../Model/Checkout"

export const checkout=async (req:Request,res:Response)=>{
            try {
                let hash:string=req.query.hash.toString()
                console.log(hash)
                const listDetailCheckout:any=await getCheckout(hash)
                res.json(listDetailCheckout)
            } catch (error) {
                console.log(error)
            }
}


export const create=async (req:Request,res:Response)=>{
    try {
        let listCheckout:Array<Checkout>=[]
        for(let i=0;i<req.body.length;i++){
                listCheckout.push(Object.assign(new Checkout(),req.body[i]))
        }
        let message:string=await craeteCheckout(req.username,listCheckout)
        console.log(message)
        res.json(message)
    } catch (error) {
            console.log(error)
    }
 
}

