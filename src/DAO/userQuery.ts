import { database } from '../configDB';
import mysql from 'mysql';
import { Login } from '../Model/Login';
import { User } from '../Model/User';
import { Register } from '../Model/Register';
import bcrypt from 'bcrypt'


export async function findAllUser(){
    try {
        const conn= mysql.createConnection(database)

        const listUser:Array<User> =[]
        const recordset=await new Promise((resolve,reject)=>{
            conn.query("select * from Account",(err,recordset)=>{
                if(err)
                    reject(err)
   
                recordset.forEach(value => {
                    listUser.push(Object.assign(new User(),value))
                });
                return resolve(listUser)
            })
        })
      
 
        return listUser
    } catch (error) {
 
        console.log(error)
    }
}
export async function getUserByUsername(username){
    try {
        const conn= mysql.createConnection(database)
     
        var user:User=undefined
        const recordset=await new Promise((resolve,reject)=>{
            conn.query("select * from account where Username=?",[username],(err,recordset)=>{
                if(err)
                    return reject(user)
                 
                    if(recordset.length>0 && recordset[0].Date!==null)
                        recordset[0].Date=recordset[0].Date.toISOString().split('T')[0]
                    user=Object.assign(new User(),recordset[0])
                    return resolve(user)
               
            })
        })
        return user
    } catch (error) {

         console.log(error)
         return user
    }
}


export async function createUser(user:Register){
    try {
        const conn= mysql.createConnection(database)
   
        let querySql:string=`insert into account(Username,Email,Phonenumber,Password,role) values (?,?,?,?,0)`
        const saltRounds:number = 10;
        const salt=await bcrypt.genSaltSync(10);
        return  new Promise( (resolve,reject)=>{
         conn.query(querySql,[user.getUsername(),user.getEmail(),user.getPhone_number(),bcrypt.hashSync(user.getPassword(), salt)],(err,recordset)=>{
                if(err){
                    
                    return reject(0)
                }
                    
                    return resolve(1)
                });
               
        
            }).then(()=>{
                conn.query("insert into Carts(Username, total_cart) values (?,?)",[user.getUsername(),0],(err,result)=>{
                  
                })
               return 1
            })
      
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function authenUser(login:Login){
    try {
        const conn= mysql.createConnection(database)
     
        var user:User=undefined
        const recordset=await new Promise((resolve,reject)=>{
            conn.query("select * from account where Username=? ",[login.getUsername()],async (err,recordset)=>{
                if(err)
                    return reject(user)
                if(recordset.length>0){
                    user=Object.assign(new User(),recordset[0])
                    let checkPass:boolean=await bcrypt.compare(login.getPassword(),user.getPassword())
                    console.log(checkPass)
                    if(checkPass===true)
                        return resolve(user)
                    return resolve(undefined)
                }
                return resolve(undefined)
         

               
            })
        })
        return recordset
    } catch (error) {

         console.log(error)
         return undefined
    }
}

export  async function updateUser(user:User){
    try {
        const conn=mysql.createConnection(database)
        return new Promise((resolve,reject)=>{
            conn.query("update Account  set Email=?, Address=?, Phonenumber=?,  Name=?, Date=?,role=? where Username=? ",
            [user.getEmail(),user.getAddress(),user.getPhonenumber(),user.getName(),user.getDate(),user.getRole(),user.getUsername()],
            
            (err,result)=>{
                if(err){
                    console.log(err)
                    return reject({message:"Thử lại"})

                }
                return resolve({message:"Thành công"})
            })
        })
    } catch (error) {
        console.log(error)
    }
}
export  async function adminUpdateUser(user:User){
    try {
        const conn=mysql.createConnection(database)
        return new Promise((resolve,reject)=>{
            const salt:number=10
        
            conn.query("update Account  set Email=?, Address=?, Phonenumber=?,  Name=?, Date=?,role=?,Password=? where Username=? ",
            [user.getEmail(),user.getAddress(),user.getPhonenumber(),user.getName(),user.getDate(),user.getRole(),bcrypt.hashSync(user.getPassword(), salt),user.getUsername()],
            
            (err,result)=>{
                if(err){
                    console.log(err)
                    return reject({message:"Thử lại"})

                }
                return resolve({message:"Thành công"})
            })
        })
    } catch (error) {
        console.log(error)
    }
}
export  async function admindeleteUser(username:string){
    try {
        const conn=mysql.createConnection(database)
        return new Promise((resolve,reject)=>{
            conn.query("delete from Account where Username=? ",
            username,
            
            (err,result)=>{
                if(err){
                    return reject({message:"Thử lại"})

                }
                return resolve({message:"Thành công"})
            })
        })
    } catch (error) {
        console.log(error)
    }
}

