var username=window.location.href.split('/')[4]
var url='http://localhost:8080/api/user/'+username;

$("#update_profile").click(function(){
    var infor = {};
    infor["Name"] = $("#name").val();
    infor["Date"] = $("#date").val();
    infor["Phonenumber"] = $("#phone").val();
    infor["Address"] = $("#address").val();
    infor["Email"] = $("#mail").val();
    console.log(infor)
    if($( "#option-role" ).val()==='admin')
        infor["role"] =1;
    else
        infor["role"]=0;
    if(validateForm()){
    $.ajax({
      headers: {
        authorization:`Bearer ${getCookie('token')}`,
    },
        type : "PUT",
        url : `http://localhost:8080/api/user/${username}`,
        contentType : "application/json",
        data : JSON.stringify(infor),
        dataType : 'json',				
        success : function(data) {
            console.log(data)
            location.reload();
            // $('#form-profile').load(location.href+" #form-profile")
        }
        
    })}
});
$(document).ready(function() {
  
    $('#form-detail').submit(function() {
       $(this).ajaxSubmit({

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

function validateForm(){
    const regex=/^0([0-9]{9})$/g;
    var checkphone= $('#phone').val().match(regex);
    if(!checkphone){
        $('.errorPhone').addClass('active')
    }

    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    var checkmail= $('#mail').val().match(EMAIL_REG);
    if(!checkmail){
        $('.errorEmail').addClass('active')
    }

    if(!checkphone||!checkmail)
        return false;
    return true;
}


// Change Pass


  $.ajax({
    headers: {

      authorization:`Bearer ${getCookie('token')}`,
  },
    type : "GET",
    contentType : "application/json",
    url : `/api/user/${username}`,

    dataType : 'json',				
    success : function(data) {
         $("#name").val(data.Name);
         $("#date").val(data.Date);
         $("#phone").val(data.Phonenumber);
         $("#address").val(data.Address);
         $("#mail").val(data.Email);
         document.getElementById('asgnmnt_file_img').src=data.img;
         document.getElementById('changepass').href="  http://localhost:8080/profile/changepass/"+data.Username
         $('option').html(data.role===1 ? "Admin":"User")
         $('option').val(data.role===1 ? "admin":"user")

    }

    
})



function confirmOrder(ojecttRef){
         $(ojecttRef).each(function(){
           let id_order =parseInt($(this).siblings('input').val())

       
           $.ajax({
              headers: {

                authorization:`Bearer ${getCookie('token')}`,
            },
              type:"PUT",
              url:'http://localhost:8080/api/order/',
              contentType:'application/json',
              dataType:'json',
              data:JSON.stringify({id: id_order}),
              success : function(data,status){
                  if(data){
                    getOrderPending()
                  }
                  else{
                    console.log(data)
                  }
              }
           })
         })
}

function cancelOrder(ojecttRef){
  $(ojecttRef).each(function(){
    let id_order =parseInt($(this).siblings('input').val())


    $.ajax({
      headers: {

        authorization:`Bearer ${getCookie('token')}`,
    },
       type:"DELETE",
       url:'http://localhost:8080/api/order/',
       contentType:'application/json',
       dataType:'json',
       data:JSON.stringify({id: id_order}),
       success : function(data,status){
           if(data){
             console.log(data)
              getOrderPending()
           }
           else{
              console.log(data)
           }
       }
    })
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

var decodedToken = getCookie('Username')
if (decodedToken.exp < new Date()/1000) {
  console.log("EXPIRED");
}

$(document).ready(function() {
            
  $('#update_avatar').submit(function(e) {
    e.preventDefault()
    $(this).ajaxSubmit({
      headers:{
        authorization:`Bearer ${getCookie('token')}`
      },
        type:'PUT',
        url: window.location.origin+"/api/user/avatar",
        error: function(xhr) {
    status('Error: ' + xhr.status);
        },

    success: function(response) {
          console.log(response)
        }
});

});    
});
function OrdersConfirmed(){
$.ajax({
  headers: {

    authorization:`Bearer ${getCookie('token')}`,
},
  type : "GET",
  contentType : "application/json",
  url : 'http://localhost:8080/api/order',
  dataType : 'json',				
  success : function(data) {
    console.log(data)
    //data=data.filter( o=> o.status===1)
    
      let text="";
      let total_price=0;
      if(data!==null){
      for(let i=0;i<data.length;i++){
          let id_order=data[i].id_order
          for(let j=0;j<data[i].listProductOrder.length;j++){
    
            total_price=data[i].listProductOrder[j].price*data[i].listProductOrder[j].numbers
           text+= `<tr>
            <td>
                <div class="media">
                  <div class="d-flex">
                    <img src="${data[i].listProductOrder[j].img}" alt="" id="img_product_cart"></div>
                    <div class="media-body">
                      <p>${data[i].listProductOrder[j].Name}</p>
                      <p>Màu :${data[i].listProductOrder[j].color} </p>
                    </div>
                  </div>
                </td>
                <td>
                  <h5>${data[i].listProductOrder[j].price}</h5>
                </td>
                <td>
                  <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
                  
                    <span >${data[i].listProductOrder[j].numbers}</span>
                    </div>
                  </td>
                  <td><h5 class="total" total="" id="total_single_product">${data[i].listProductOrder[j].numbers*data[i].listProductOrder[j].price}</h5>
                  </td></tr>  ` 
        
            if(j===data[i].listProductOrder.length-1) {
              text+=  `<td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="confirmOrder(this)">Xác nhận nhận hàng</button></td>
                <td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="cancelOrder(this)">Hủy đơn hàng</button></td>
                <td><h5>Tổng giá</h5></td><td><h5 data-finalprice="36000123" id="finalprice">${total_price}</h5></td>
                <tr></tr>`
            }
       }
      }
       document.getElementById('list_product').innerHTML=text;
      }
      else{
   
          document.getElementById('list_product').innerHTML="";
        
      }
      document.getElementById('container_profile').style.display='none';
      document.getElementById('info-order').style.display='block';
    }
   
  
})
}
function passFileUrl(){
  document.getElementById('asgnmnt_file').click();
}

function fileSelected(inputData){
  document.getElementById('asgnmnt_file_img').src = window.URL.createObjectURL(inputData.files[0])
}
function profile(){
      document.getElementById('container_profile').style.display='block';
      document.getElementById('info-order').style.display='none'
      // document.getElementById('infor_voucher').style.display='blc'
}
function order(){
  $.ajax({
    headers: {

      authorization:`Bearer ${getCookie('token')}`,
  },
    type : "GET",
    contentType : "application/json",
    url : 'http://localhost:8080/api/order',
    dataType : 'json',				
    success : function(data) {
      data=data.filter( o=> o.status===0)
        console.log(data)
        let text="";
        let total_price=0;
        if(data!==null){
          for(let i=0;i<data.length;i++){
            let id_order=data[i].id_order
            for(let j=0;j<data[i].listProductOrder.length;j++){
      
              total_price=data[i].listProductOrder[j].price*data[i].listProductOrder[j].numbers
             text+= `<tr>
              <td>
                  <div class="media">
                    <div class="d-flex">
                      <img src="${data[i].listProductOrder[j].img}" alt="" id="img_product_cart"></div>
                      <div class="media-body">
                        <p>${data[i].listProductOrder[j].Name}</p>
                        <p>Màu :${data[i].listProductOrder[j].color} </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5>${data[i].listProductOrder[j].price}</h5>
                  </td>
                  <td>
                    <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
                    
                      <span >${data[i].listProductOrder[j].numbers}</span>
                      </div>
                    </td>
                    <td><h5 class="total" total="" id="total_single_product">${data[i].listProductOrder[j].numbers*data[i].listProductOrder[j].price}</h5>
                    </td></tr>  ` 
          
              if(j===data[i].listProductOrder.length-1) {
                text+=  `<td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="confirmOrder(this)">Xác nhận nhận hàng</button></td>
                  <td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="cancelOrder(this)">Hủy đơn hàng</button></td>
                  <td><h5>Tổng giá</h5></td><td><h5 data-finalprice="36000123" id="finalprice">${total_price}</h5></td>
                  <tr></tr>`
              }
         }
        }
       
         document.getElementById('list_product').innerHTML=text;
        
        }
        else{
     
            document.getElementById('list_product').innerHTML="";
          
        }
      }
     
    
})
      document.getElementById('container_profile').style.display='none';
      document.getElementById('info-order').style.display='block';

}
function getOrderPending(){
  $.ajax({
    headers: {

      authorization:`Bearer ${getCookie('token')}`,
  },
    type : "GET",
    contentType : "application/json",
    url : 'http://localhost:8080/api/order',
    dataType : 'json',				
    success : function(data) {
      data=data.filter( o=> o.status===0)
        console.log(data)
        let text="";
        let total_price=0;
        if(data!==null){
          for(let i=0;i<data.length;i++){
            let id_order=data[i].id_order
            for(let j=0;j<data[i].listProductOrder.length;j++){
      
              total_price=data[i].listProductOrder[j].price*data[i].listProductOrder[j].numbers
             text+= `<tr>
              <td>
                  <div class="media">
                    <div class="d-flex">
                      <img src="${data[i].listProductOrder[j].img}" alt="" id="img_product_cart"></div>
                      <div class="media-body">
                        <p>${data[i].listProductOrder[j].Name}</p>
                        <p>Màu :${data[i].listProductOrder[j].color} </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5>${data[i].listProductOrder[j].price}</h5>
                  </td>
                  <td>
                    <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
                    
                      <span >${data[i].listProductOrder[j].numbers}</span>
                      </div>
                    </td>
                    <td><h5 class="total" total="" id="total_single_product">${data[i].listProductOrder[j].numbers*data[i].listProductOrder[j].price}</h5>
                    </td></tr>  ` 
          
              if(j===data[i].listProductOrder.length-1) {
                text+=  `<td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="confirmOrder(this)">Xác nhận nhận hàng</button></td>
                  <td> <input type='hidden' value=${data[i].listProductOrder[j].id_order}><button class="btn comfrim" onclick="cancelOrder(this)">Hủy đơn hàng</button></td>
                  <td><h5>Tổng giá</h5></td><td><h5 data-finalprice="36000123" id="finalprice">${total_price}</h5></td>
                  <tr></tr>`
              }
         }
        }
       
         document.getElementById('list_product').innerHTML=text;
        }
        else{
     
            document.getElementById('list_product').innerHTML="";
          
        }
      }
     
    
})
}