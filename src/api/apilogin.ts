import { Request, Response, Router,NextFunction } from 'express';
import { authticationLogin } from '../middleware/auth';
import { login } from '../controller/logincontroller';


const router:Router=Router()


router.post("/",authticationLogin,login)







export default router