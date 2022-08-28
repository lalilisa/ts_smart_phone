import {Router} from 'express';
import { getCart, addCart, updateCart, deleteProductInCart } from '../controller/cartcontroller';
import { authenticationToken } from '../middleware/auth';




const router:Router=Router()

router.get("/",authenticationToken,getCart)

router.post("/",authenticationToken,addCart)

router.put("/",authenticationToken,updateCart)

router.delete("/:id",authenticationToken,deleteProductInCart)

export default router