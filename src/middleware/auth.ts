import { Request, Response, Router,NextFunction } from 'express';
import { Login } from '../Model/Login';
import { authenUser, getUserByUsername } from '../DAO/userQuery';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { User } from '../Model/User';

dotenv.config()
export const authticationLogin=async (req:Request,res:Response,next:NextFunction)=>{
    try {
            let data=req.body
            let login:Login=Object.assign(new Login(),data)
            let authenuser=await authenUser(login)
            if(authenuser){     
                next()
            }
            else
                res.status(200).json({message:"Thong tin sai"})
    } catch (error) {
        console.log(error)
    }
}

export const authenticationToken=async (req:Request,res:Response,next:NextFunction)=>{
    try {
            let headers_token=req.headers.authorization.split(" ")
            if(headers_token[0]==="Bearer" && headers_token[1]!==undefined){
                    let tokenVerify=jwt.verify(headers_token[1],process.env.JWT_SECRET_KEY)
              
                    req.username=tokenVerify.username
                    next()
            }
            else{
                res.status(401).json("Unauthorization")
            }

    } catch (error) {
        
        console.log(error)
        res.status(401).json("Unauthorization")
    }
}

export const authorization=async (req:Request,res:Response,next:NextFunction)=>{
    try {
     
        let headers_token=req.headers.authorization.split(" ")
        if(headers_token[0]==="Bearer" && headers_token[1]!==undefined){
                let tokenVerify=jwt.verify(headers_token[1],process.env.JWT_SECRET_KEY)
                let user:User=await getUserByUsername(tokenVerify.username)
                console.log(user.getRole())
                if( user.getRole()===1){
                    req.username=tokenVerify.username
                    next()
                }
                else{

                    res.status(401).json("Unauthorization")
                }
              
        }
        else{
            res.status(401).json("Unauthorization")
        }

        } catch (error) {
            
            console.log(error)
            res.status(401).json("Unauthorization")
        }
}