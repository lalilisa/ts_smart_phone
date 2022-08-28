

function test(){
    return new Promise(function(res,rej){
       return res(42)
    }).then(()=>{
        return "I love you"
    })
}
async function inss(){
    let s=await test()
    console.log(s)
}
inss()
