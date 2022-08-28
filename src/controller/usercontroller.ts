import { Request, Response } from "express";
import { getUserByUsername, updateUser } from "../DAO/userQuery";
import { User } from "../Model/User";





export const getUser=async (req:Request,res:Response)=>{ 
    try {
           
            let username:string=req.username
    
        if(req.params.username===username){
            let username=req.params.username
            let user:User=await getUserByUsername(username)
            if(user.getUsername()!==undefined){
           
                res.status(200).json(user)
            }
            else
                res.status(200).json({message:"user not exist"})
        }
        else{
         
            res.status(401).json("Unauthorization")
        }
    } catch (error) {
            console.log(error)
    }
}
export const updateInfor=async (req:Request,res:Response)=>{ 
    try {
           
            let username:string=req.username
    
        if(req.params.username===username){
            let username=req.params.username
            console.log(req.body)
            let user:User=Object.assign(new User(),req.body)
            user.setUsername(username)
   

            let message=await updateUser(user)
            
                res.status(200).json(message)
        }
        else{
         
            res.status(401).json("Unauthorization")
        }
    } catch (error) {
            console.log(error)
    }
}