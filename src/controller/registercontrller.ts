import { Request, Response, Router } from "express";
import { Register } from '../Model/Register';
import {createUser} from '../DAO/userQuery'

export const registerAccount=async (req:Request,res:Response)=>{
        try {
                let register:Register=Object.assign(new Register(),req.body)
                console.log(register)
        
                let status =await createUser(register)
                console.log("ssss "+status)
                if(status)
                        res.status(200).json({ message: "Success"})
        
                else{
                        res.status(500).json({ message: "Failure"})
                }
        }
         catch (error) {
                res.status(500).json({ message: "Failure"})
        }
}