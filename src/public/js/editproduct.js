$(document).ready(function() {
            
    $('#addmodel').submit(function() {
      $(this).ajaxSubmit({
          type:'PUT',
          url: `${window.location.origin}/api/product/${paramsID}`,
          error: function(xhr) {
      status('Error: ' + xhr.status);
          },

      success: function(response) {
            console.log(response)
          }
  });
  return false;
  });    
  });





function deleteProduct(id){
    let ID={};
    ID['id']=id;
    $.ajax({
        type : "Delete",
        contentType : "application/json",
        url : `${window.location.href}${id}`,
        data : JSON.stringify(ID),
        dataType : 'json',				
        success : function(data) {
            console.log(data);
            $('#showmodel').load(window.location.href +' #showmodel')
        }
        
    }) 
}

let paramsID=window.location.href.split('/')[5]
$.ajax({
    headers:{
      authorization:`Bearer ${getCookie('token')}`  
    },
    type:"get",
    url:`${window.location.origin}/api/product/${paramsID}`,
    contentType:"json/appliction",
    dataType:"json",
    success :function(data){
        console.log(data)
        $('#nameproduct').val(data.Name)
        $('#brand').val(data.Brand)
        $('#Ram').val(data.Ram)
        $('#rom').val(data.ROM)
        $('#discount').val(data.Discount)
        $('#Describes').val(data. Describes)
    
    }
})
function searchProduct(){
    let info=$("#input_search").val();
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('token')}`
        },
        type:"GET",
        url:"http://localhost:8080/api/product",
        contentType:"application/json",
        dataType:"json",
        success:function(response){
            let filterList=response.filter(o=> o.Name.toLowerCase().includes(info.toLowerCase()))

            let element=`       <div class="show-content" id="column">
                                    <div>ID_Product</div>
                                    <div class="box2">Name</div>
                                    <div> Hãng </div>
                                    <div>Giá</div>
                                    <div>Action</div>
                                </div>`
            for(let i=0;i<filterList.length;i++){
                    element+=`<div class="show-content" id="inforUser">
                    <div>${filterList[i].ProductID}</div>
                    <div class="box2">${filterList[i].Name}</div>
                    <div>${filterList[i].Brand}</div>
                    <div>${filterList[i].Discount}</div>
                    <div>
                    <a href=""><i class="fas fa-pencil-alt"></i></a>
                    <button style="color: black; margin-left: 0.5rem;" onclick="deleteProduct('${filterList[i].ProductID}')"><i class="fas fa-times"></i></button >
                </div>
                </div>`
            }
            document.getElementById("list_product").innerHTML=element
        },
        
    })
}
function searchProductDetail(){
    let info=$("#input_search_detail").val();
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('token')}`
        },
        type:"GET",
        url:"http://localhost:8080/api/product/detail",
        contentType:"application/json",
        dataType:"json",
        success:function(response){
            let filterList=response.filter(o=> o.Name.toLowerCase().includes(info.toLowerCase()))

            let element=`       <div class="show-content" id="column">
                                    <div>ID_Product</div>
                                    <div class="box2">Name</div>
                                    <div> Hãng </div>
                                    <div>Giá</div>
                                    <div>Action</div>
                                </div>`
            for(let i=0;i<filterList.length;i++){
                    element+=`<div class="show-content" id="inforUser">
                    <div>${filterList[i].id_detail}</div>
                    <div class="box2">${filterList[i].Name}</div>
                    <div>${filterList[i].Brand}</div>
                    <div>${filterList[i].price}</div>
                    <div>
                    <a href=""><i class="fas fa-pencil-alt"></i></a>
                    <button style="color: black; margin-left: 0.5rem;" onclick="deleteProduct('${filterList[i].ProductID}')"><i class="fas fa-times"></i></button >
                </div>
                </div>`
            }
            document.getElementById("list_detail").innerHTML=element
        },
        
    })
}

const debounce = (func, delay) => {
    let timerId;
    return function () {
        clearTimeout(timerId)
        timerId = setTimeout(() => func.apply(this, arguments), delay)
    };
  };
  
$("#input_search").on('keyup',searchProduct)
$("#input_search_detail").on("keyup",searchProductDetail)
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function successOrder(){
    $.ajax({
    
            type : "GET",
            contentType : "application/json",
            url : 'http://localhost:8080/api/order/all_order',
            dataType : 'json',				
            success : function(data) {
              
                data=data.filter(o=>o.status===1)
                console.log(data);
                    let element=`   <div class="show-content" id="column">
                                                <div>Username</div>
                                                <div class="box2">Tên sản phẩm</div>
                                                
                                                <div>Màu</div>
                                                <div>Số lượng</div>
                                                <div>Ảnh</div>
                                            
                                    </div>`
                    for(let i=0;i<data.length;i++){
                    
                        element+=`
                <div class="show-content" id="inforUser">
                  <div>${data[i].Username}</div>
                  <div class="box2">${data[i].Name}</div>
                  <div>${data[i].color}</div>
                  <div>${data[i].number}</div>
                  <div> <img src=${data[i].img}></div>
               
              </div>`
              if(i===data.length-1 || data[i].id_order!==data[i+1].id_order  ){
                element+=     `<div class="show-content" >
                             <div></div>
                             <div></div>
                             <div></div>
                             <div id="btn-delete-order">Hoàn Thành</div>
    
                     </div>
                 
                         
                     </div>
                 </div>
                                 `
                 }
                }
                    document.getElementById('showmodel').innerHTML=element;
        
    
            } 
    
    })   
    }
    function pendingOrder(){
        $.ajax({
                headers:{
                    authorization:`Bearer ${getCookie('token')}`
                },
                type : "GET",
                contentType : "application/json",
                url : 'http://localhost:8080/api/order/all_order',
                dataType : 'json',				
                success : function(data) {
                    console.log(data)
                    data=data.filter(o=>o.status===0)
                    console.log(data);
                    let element=`   <div class="show-content" id="column">
                                                <div>Username</div>
                                                <div class="box2">Tên sản phẩm</div>
                                                
                                                <div>Màu</div>
                                                <div>Số lượng</div>
                                                <div>Ảnh</div>
                                           
                                    </div>`
                    for(let i=0;i<data.length;i++){
                    
                        element+=`
                <div class="show-content" id="inforUser">
                  <div>${data[i].Username}</div>
                  <div class="box2">${data[i].Name}</div>
                  <div>${data[i].color}</div>
                  <div>${data[i].number}</div>
                  <div> <img src=${data[i].img}></div>
    
            </div>`
                   if(i===data.length-1||data[i].id_order!==data[i+1].id_order){                
                  element+= ` <div class="show-content" >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div id="btn-delete-order" onclick="deleteOrder(${data[i].id_order})">Xóa Order</div>
              </div>  
                            
          </div>
                        `
                    
                }
            } 
                    // document.getElementById('show-page').innerHTML=element;
                    // document.getElementById('show-page').style.display='block';
        
                    document.getElementById('showmodel').innerHTML=element;
                } 
        
        })   
        }
        function deleteOrder(id){
            $.ajax({
                headers:{
                    authorization:`Bearer ${getCookie("token")}`
                },
                type:"DELETE",
                url:`${window.location.origin}/api/order/${id}`,
                dataType:"json",
                contentType:"application/json",
                success:function(data){
                    $('#show-page').load("http://localhost:8080/admin" +' #show-page')
                },
                
            })
             
                
          }

    