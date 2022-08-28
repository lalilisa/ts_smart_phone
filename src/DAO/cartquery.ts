import mysql from 'mysql';
import { database } from '../configDB';
import { DetailProduct } from '../Model/DetailProduct';
import { CartDetailProduct } from '../Model/CartProduct';

export async function findProductInCartByUsername(username:string){

    try {
        const conn=mysql.createConnection(database)
        const sqlquery="select * from CartDetail where id_cart=(select id_cart from Carts where Username=?)"
        var listDetailProduct:Array <CartDetailProduct>=[]
        const recordset=await new Promise((resolve,reject)=>{
            conn.query(sqlquery,[username],(err,result)=>{
                    if(err)
                       return reject(undefined)
                
                    for(let i=0;i<result.length;i++){
                        listDetailProduct.push(Object.assign(new CartDetailProduct(),result[i]))
                    }
                    return resolve(listDetailProduct)
            })
        })
        return listDetailProduct
    } catch (error) {
        console.log(error)
    }

}

export async function addtoCart(username:string,productdetail:DetailProduct,name_product:string){
        try {
            const conn=mysql.createConnection(database)
            let checkProductinCart=await checkDetailinCart(productdetail.getId_detail(),username)
            if(checkProductinCart){
                
                conn.query("update  CartDetail set numbers=numbers+? where ID_Productdetail=? and id_cart=(select id_cart from Carts where Username=?)",
                [productdetail.getNumbers(),productdetail.getId_detail(),username],(err,result)=>{
                        if(err){
                            console.log(err)
                            return 0
                        }
                        return 1
                }
                )
                return 1
            }
            else{
                console.log("Trimai")
                let id_cartdetail=await countDetailinCart()
                id_cartdetail=Number(id_cartdetail)+1
                let id_cart=await getIdCart(username)
                console.log("ssss "+id_cart)
                let data=[[id_cart,id_cartdetail,productdetail.getId_detail(),productdetail.getID_Product(),productdetail.getColor(),name_product,productdetail.getImg(),productdetail.getPrice(),productdetail.getNumbers()]]
                conn.query("insert into CartDetail(id_cart, id_cartdetail, ID_Productdetail, ID_Product, color, name_product, img, single_price, numbers) values ?",
                [data],(err,result)=>{
                        if(err){
                            console.log(err)
                            return 0
                        }
                        return 1
                }
                )
            }
        } catch (error) {
            
        }
}
export  function checkDetailinCart(id_detail:number,username:string){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select * from CartDetail where ID_Productdetail=? and id_cart=(select id_cart from Carts where Username=?)",
            [id_detail,username],(err,result)=>{
                if(err)
                    return reject(0)
                if(result[0])
                     return resolve(result[0].id_cart)
                return resolve(0)
            }
            )
        })
    } catch (error) {
        
    }
}
export  function countDetailinCart(){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select count(id_cartdetail) as number_row from CartDetail",
          (err,result)=>{
                if(err)
                    return reject(0)
                return resolve(result[0].number_row)
            }
            )
        })
    } catch (error) {
        
    }
}
export  function getIdCart(username:string){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select id_cart from Carts where Username=?",
            [username],(err,result)=>{
                if(err)
                    return reject(0)
                if(result[0])
                     return resolve(result[0].id_cart)
                return resolve(0)
            }
            )
        })
    } catch (error) {
        
    }
}


export async function editCart(productdetail:DetailProduct,username:string){
    try {
        const conn=mysql.createConnection(database);
        conn.query("update  CartDetail set numbers=? where ID_Productdetail=? and id_cart=(select id_cart from Carts where Username=?)",
         [ productdetail.getNumbers(),productdetail.getId_detail() ,username],(err,result)=>{
                if(err)
                   console.log(err)
            }
            )
        return {message:"Update success"}
    } catch (error) {
        console.log(error)
    }
}

export async function removeProductInCart(productdetail:DetailProduct,username:string){
    try {
        console.log(username)
        const conn=mysql.createConnection(database);
        conn.query("delete from  CartDetail  where ID_Productdetail=? and id_cart=(select id_cart from Carts where Username=?)",
        [ productdetail.getId_detail(), username],(err,result)=>{
                if(err)
                   console.log(err)
            }
            )
        return {message:"Remove success"}
    } catch (error) {
        console.log(error)
    }
}

