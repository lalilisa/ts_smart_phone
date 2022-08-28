window.onload=loadDetail()
// window.onload=loadReview()
var fistlitag
function loadDetail(){
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/api/product/detailsamemodel/'+window.location.href.split('/')[4],
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            console.log(data)
            document.getElementById("name_product").innerHTML=data[0].Name.toUpperCase()
            let text='';
            let tableinfor=''
            for(let i=0;i<data.length;i++){
                text+=`                 <input type="hidden" value="${data[i].ID_Product}" id="hidden_ID">
                                        <li data-chip="${data[i].Chip}" data-price="${data[i].price}" 
                                            data-OS="${data[i].OS}" data-fontcam="${data[i].frontcamera}"
                                            data-rearcam="${data[i].rearcamera}" data-screen="${data[i].screen}"  data-color="${data[i].color}"
                                            data-pin="${data[i].pin}" data-img="${data[i].img[1]}" data-id="${data[i].id_detail}" data-numbers="${data[i].numbers}">
                                            <span  class="color" onclick="chosen(this,${data[i].Discount},${data[i].price})">${data[i].color}</span>
                                        </li>						         
                   
                        `
                tableinfor=`<tbody>
                                <tr>
                                    <td>
                                        <h5 >RAM</h5>
                                    </td>
                                    <td>
                                        <h5 id="RAM">${data[i].RAM}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>ROM</h5>
                                    </td>
                                    <td>
                                        <h5 id="ROM">${data[i].ROM}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>OS</h5>
                                    </td>
                                    <td>
                                        <h5 id="os">${data[i].OS}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Camera trước</h5>
                                    </td>
                                    <td>
                                        <h5 id="fontcam">${data[i].frontcamera}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Camera sau</h5>
                                    </td>
                                    <td>
                                        <h5 id="rearcam">${data[i].rearcamera}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Màn hình</h5>
                                    </td>
                                    <td>
                                        <h5 id="screen">${data[i].screen}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Pin</h5>
                                    </td>
                                    <td>
                                        <h5 id="pin">${data[i].pin}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Chip</h5>
                                    </td>
                                    <td>
                                        <h5 id="chip">${data[i].Chip}</h5>
                                    </td>
                                </tr>
                            </tbody>`
            }
            
            document.getElementById('list').innerHTML=text;
            document.getElementById('table_infor').innerHTML=tableinfor;
            data[0].Describe!==null ? document.getElementById('home').innerHTML=data[0].Describe : document.getElementById('home').innerHTML=''

            fistlitag=document.querySelectorAll("#list>li");
            fistlitag[0].classList.add('active')
            document.getElementById("img_product").src=fistlitag[0].getAttribute('data-img');
            document.getElementById('price_product').innerHTML=discountProduct(data[0].price,data[0].Discount);
            document.getElementById("number").setAttribute('data-number',data[0].numbers)
            document.getElementById("number").innerHTML=`Số lượng :${data[0].numbers}`
        }
    })
}

function chosen(ojecttRef,discount,price) {
    $(ojecttRef).each(function() {
        let parent=$(this).closest('li');
        $('li').removeClass('active');
        parent.addClass('active');
        document.getElementById("img_product").src=$(this).closest('li').attr('data-img');
        let ele=discountProduct(price,discount)
        document.getElementById("number").setAttribute('data-number',$(this).closest('li').attr('data-numbers'))
       document.getElementById("number").innerHTML=`Số lượng : ${$(this).closest('li').attr('data-numbers')}`
        document.getElementById('price_product').innerHTML=ele
        infor(parent.attr('data-chip'),parent.attr('data-os'),parent.attr('data-fontcam'),parent.attr('data-rearcam'),parent.attr('data-screen'),parent.attr('data-pin'))
    })
}

function discountProduct(price,discount){
    if(discount===0){
         return `<h2 id="price_product">${(price*(100-discount)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"} </h2>`
     }
     else{
         return ` <h4 id="price_product" style="text-decoration-line:line-through">${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</h4>
         <h2 id="price_product">${(price*(100-discount)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"} <span class="discount">giảm ${discount}%</span></h2>
        `
     }
 }

function infor(chip,os,fontcam,rearcam,screen,pin){

    document.getElementById('chip').innerHTML=chip;
    document.getElementById('os').innerHTML=os;
    document.getElementById('fontcam').innerHTML=fontcam;
    document.getElementById('rearcam').innerHTML=rearcam;
    document.getElementById('screen').innerHTML=screen;
    document.getElementById('pin').innerHTML=pin;
}

$("#add_to_cart").click(function(){
    var list=document.querySelectorAll("#list>li");
    let index;
    for(let i=0;i,list.length;i++){
        if(list[i].classList.length===1){
                index=i;
                break;
        }

    }
    
    // ID_Product,ID_Productdetail,color,number,price
    var infor = {};
    infor["name"]=$("#name_product").html();
    infor["img"]=$("#img_product").attr("src");
    infor["id_detail"]=parseInt(list[index].getAttribute('data-id'));
    infor["ID_Product"]= parseInt($("#hidden_ID").val())
    infor["color"]=list[index].getAttribute('data-color');
    infor["numbers"]=parseInt($("#sst").val());;
    infor["single_price"]=parseFloat(list[index].getAttribute('data-price'));
    infor["price"]=infor["numbers"]*(parseFloat(list[index].getAttribute('data-price')));
    let numberProduct=parseInt($('#number').attr('data-number'))
    console.log(infor)
   
    if(numberProduct> infor.numbers){
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie("token")}`
        },
        type : "POST",
        contentType : "application/json",
        url : "http://localhost:8080/api/cart",
        data : JSON.stringify(infor),
        dataType : 'json',				
        success : function(data) {
            console.log(data)
            document.querySelector(".checknumber").remove('active')
            document.querySelector(".add_cart_success").classList.add("active")
            setTimeout(function(){
                document.querySelector(".add_cart_success").remove('active')
             },1500)
        },
        error:function(res){
            console.log(res)
            // window.location.href="/login"
        }
        
    })
}
else{
    document.querySelector(".checknumber").classList.add("active")
   
    setTimeout(function(){
       
     },1500)
}
});



