
import { Request, Response, Router,NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
export const login=(req:Request,res:Response,next:NextFunction)=>{
            try {
                
                let data=req.body
                
                let token=jwt.sign({username:data.username},process.env.JWT_SECRET_KEY)
                res.cookie("token",token)
                res.cookie("username",data.username)
                res.status(200).json({message:"Success",token:token})
            } catch (error) {
                console.log(error)
            }
                   
}