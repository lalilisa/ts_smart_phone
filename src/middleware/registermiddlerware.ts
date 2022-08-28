import { Response, Request, NextFunction } from 'express';
import { getUserByUsername } from '../DAO/userQuery';
import { User } from '../Model/User';


export const checkUserExist=async (req:Request,res:Response,next:NextFunction)=>{
    try {
            let data=req.body;
            
            let user:User=await getUserByUsername(data.username)
       
            if(user.getUsername()===undefined)
                next()
            else
                res.json({message:"User is exist"})
    } catch (error) {
        console.log(error)
    }
}
