import { Request, Response } from "express"
import { admindeleteUser, adminUpdateUser, findAllUser, getUserByUsername, updateUser } from "../DAO/userQuery"
import { User } from '../Model/User';

export const getAllUser=async (req:Request,res:Response)=>{ 
    try {
            
            let users:User[]=await findAllUser()
            if(users!==undefined){
           
                res.status(200).json(users)
            }
            
        }
    catch (error) {
            console.log(error)
    }
}
export const getUser=async (req:Request,res:Response)=>{ 
    try {
            let username=req.params.username
            let user:User=await getUserByUsername(username)
            if(user.getUsername()!==undefined){
           
                res.status(200).json(user)
            }
            else
                res.status(200).json({message:"user not exist"})
        }
    catch (error) {
            console.log(error)
    }
}
export const updateInfor=async (req:Request,res:Response)=>{ 
    try {

            let username=req.params.username
            console.log(req.body)
            let user:User=Object.assign(new User(),req.body)
            user.setUsername(username)
            let message=await adminUpdateUser(user)
            
                res.status(200).json(message)
      
      
    } catch (error) {
            console.log(error)
    }
}

export const deleteuser=async (req:Request,res:Response)=>{ 
    try {

            let username=req.params.username
     
            let message=await admindeleteUser(username)
            
            res.status(200).json(message)
      
      
    } catch (error) {
            console.log(error)
    }
}
