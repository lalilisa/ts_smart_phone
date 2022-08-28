


function successOrder(){
$.ajax({

        headers:{
          authorization:`Bearer ${getCookie('token')}`
        },

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
                  for(let j=0;j<data[i].listProductOrder.length;j++){
                    element+=`
                          <div class="show-content" id="inforUser">
                            <div>${data[i].username}</div>
                            <div class="box2">${data[i].listProductOrder[j].Name}</div>
                            <div>${data[i].listProductOrder[j].color}</div>
                            <div>${data[i].listProductOrder[j].numbers}</div>
                            <div> <img src=${data[i].listProductOrder[j].img}></div>
                        
                        </div>`
                        if(j===data[i].listProductOrder.length-1){
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
      }
        
         
                document.getElementById('show-page').innerHTML=element;
    

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
              for(let j=0;j<data[i].listProductOrder.length;j++){
              element+=`
              <div class="show-content" id="inforUser">
              <div>${data[i].username}</div>
              <div class="box2">${data[i].listProductOrder[j].Name}</div>
              <div>${data[i].listProductOrder[j].color}</div>
              <div>${data[i].listProductOrder[j].numbers}</div>
              <div> <img src=${data[i].listProductOrder[j].img}></div>

              </div>`
              if(j===data[i].listProductOrder.length-1){
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
              }


document.getElementById('show-page').innerHTML=element;

                document.getElementById('show-page').innerHTML=element;
    
            } 
    
    })   
    }
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