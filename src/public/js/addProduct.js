$(document).ready(function() {
  
    $('#form-add').submit(function() {

       $(this).ajaxSubmit({
            type:"POST",
            url:`${window.location.origin}/api/product`,
           error: function(xhr) {
       status('Error: ' + xhr.status);
           },

       success: function(response) {
            console.log(response);
            if(response){
                $('#alert-success').html("Thêm thành công").css('color', 'green');
                $('#alert-success').addClass('active');
                 setTimeout(function(){
                   
                    // $('#alert-success').remove('active');
                    document.querySelector('#alert-success').classList.remove('active');
                }, 2000);
            }
            else{
                $('#alert-success').addClass('active');
                $('#alert-success').html("Lỗi").css('color', 'red');
                setTimeout(function(){
                     
                    document.querySelector('#alert-success').classList.remove('active');
                    // $('#alert-success').remove('active');
                }, 2000);
            }
           }
   });
   return false;
   });    
});
$(document).ready(function() {
  
    $('#form-detail').submit(function() {
       $(this).ajaxSubmit({
        type:"POST",
        url:`${window.location.origin}/api/product/detail`,
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
                    document.getElementById('form-add').innerHTML=element;
        
    
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
        
                    document.getElementById('form-add').innerHTML=element;
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


$.ajax({
    type:"GET",
    url:`${window.location.origin}/api/product`,
    contentType:"json/application",
    dataType:"json",
    success :function(data){
        console.log(data)
        //id_product
        let ele=""
        for(let i=0;i<data.length;i++){
                ele+= `<option value="${data[i].ID_Product}" name="${data[i].Name}"> ${data[i].ID_Product} ${data[i].Name} ${data[i].Ram}</option>`
        }
        document.getElementById("id_product").innerHTML=ele
    }
})

    
    