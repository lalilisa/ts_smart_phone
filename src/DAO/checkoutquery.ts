import mysql from 'mysql';
import { database } from '../configDB';
import { Checkout } from '../Model/Checkout';
import bcrypt from 'bcrypt';
import { getIdCart } from './cartquery';


function hashID(data:Checkout[]){
   
    let re=""
    for(let i=0;i<data.length;i++){
            re+=(data[i].getID_Productdetail().toString()+data[i].getNumbers().toString())
    }
    
    return re.toString();

}
function setCheckout(listCheckout:Checkout[],last_idcheckout:number,last_idcheckoutdetail:number):Array<any>{
        let set:Array<any>=[]
        for(let i=0;i<listCheckout.length;i++){
            set.push([last_idcheckoutdetail+1+i,last_idcheckout,
                listCheckout[i].getId_cartdetail(),listCheckout[i].getID_Productdetail(),
                listCheckout[i].getID_Product(),listCheckout[i].getColor(),
                listCheckout[i].getName_product(),listCheckout[i].getImg(),
                listCheckout[i].getSingle_price(),listCheckout[i].getNumbers()])
    }
    return set
}
export async function craeteCheckout(username,listCheckout:Checkout[]){
        try {
            console.log("Trimai")
            const conn=mysql.createConnection(database)
            var listToken:any=await findListCheckout(username)
            var t=undefined;
 
        for(let i=0;i<listToken.length;i++){

                let match= false
                
                match=await bcrypt.compare(hashID(listCheckout),listToken[i].hash);

                if(match===true){
                    t=listToken[i];
                    console.log("trrrrr")
                    break;
                }
            }
            if(t!==undefined){
                console.log(t)
                return t.token;
            }
            else{   
                    console.log("DATA VAO ELSE")
                    let salt = bcrypt.genSaltSync(10);
                    let hash=bcrypt.hashSync(hashID(listCheckout),salt);
                    let token=hash.replace(/\/+/g,'')
                    let id_cart=await getIdCart(username)
                    await conn.query("insert into Checkout(id_cart, token, hash) values (?,?,?)",[id_cart,token,hash])
                    
                    let last_checkoutdetail= await countProductCheckout()
                    console.log((Number(id_cart)))
                    let last_id=await last_IDcheckout(Number(id_cart))
                    console.log("last_id")
                    console.log(last_id)
                    await conn.query("insert into CheckoutDetail(id_checkoutdetail, id_checkout, id_cartdetail, ID_Productdetail, ID_Product, color, name_product, img, single_price, numbers) values ?",[setCheckout(listCheckout,Number(last_id),Number(last_checkoutdetail))])
                    return token
            }
      
        } catch (error) {
            console.log(error)
        }
}
export async function countProductCheckout(){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
                conn.query("select count(id_checkoutdetail) as 'row_number' from CheckoutDetail",(err,result)=>{
                        if(err)
                            return reject(err)
                        if(result)
                            return resolve(result[0].row_number)
                })
        })
    } catch (error) {
        console.log(error)
    }
}

export async function findListCheckout(username:string){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
                conn.query("select id_checkout,hash,token from Checkout where id_cart=(select id_cart from Carts where Username=?)",[username],(err,result)=>{
                        if(err)
                            return reject(err)
                        return resolve(result)
                })
        })
    } catch (error) {
        console.log(error)
    }
}
async function last_IDcheckout(id_cart:number){
    const conn=mysql.createConnection(database);
    return new Promise((resolve,reject)=>{
        conn.query("select id_checkout from Checkout where id_cart=? ORDER BY id_checkout DESC limit 1",[id_cart],function(err,rs){
            if(err){
                console.log(err)
                return reject(1)
                
            }
            if(rs.length>0)
                return resolve(rs[0].id_checkout)
            return resolve(1)
    })
    })
}

export async function getCheckout(hash:string){
        try {
            const conn=mysql.createConnection(database);
            var listCheckout:Array<Checkout>=new Array<Checkout>()
            await new Promise((resolve,reject)=>{
                conn.query("select * from CheckoutDetail where id_checkout=(select id_checkout from Checkout where token=?)",[hash],
                    (err,result)=>{
                        if(err){
                            listCheckout=undefined
                            return reject(listCheckout)
                        }
                       
                        for(let i=0;i<result.length;i++){
                            let checkoutdetail= Object.assign(new Checkout(),result[i])
                            listCheckout.push(checkoutdetail)
                        }
                        return resolve(listCheckout)
                    })
            })
            return listCheckout
        } catch (error) {
            console.log(error)
        }
}



