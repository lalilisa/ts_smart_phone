


window.onload=loadCheckout()
function loadCheckout(){
    $.ajax({
      headers:{
        authorization:`Bearer ${getCookie('Username')}`
    },
        type:'GET',
        url:'http://localhost:8080/api/checkout/'+window.location.search,
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            console.log(data)
            let hoadon=""
            let text="";
            let total_price=0;
            for(let i=0;i<data.length;i++){
            text+=` <tr>
            <td>
                <div class="media">
                  <div class="d-flex">
                    <img src="${data[i].img}" alt="" id="img_product_cart"></div>
                    <div class="media-body">
                      <p data-id=${data[i].ID_Productdetail}>${data[i].name_product}</p>
                      <p>Màu :${data[i].color} </p>
                    </div>
                  </div>
                </td>
                <td>
                  <h5>${data[i].single_price}</h5>
                </td>
                <td>
                  <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
                  
                    <span >${data[i].numbers}</span>
                    </div>
                  </td>
                  <td><h5 class="total" total="" id="total_single_product">${data[i].numbers*data[i].single_price}</h5>
                  </td>
                </tr>

                <tr>`
                total_price+=data[i].numbers*data[i].single_price;
            // for(let i=0;i<data.length;i++){

             }
             document.getElementById('list_product').innerHTML=text;
             let total=`
                        <li><a href="#" >Tổng tiền <span id='totalprice'>${total_price}</span></a></li>
                 
                     
                        `;
            document.getElementById('order').innerHTML=total;
        }

    })
}
var finalprice=0;
$('.total').each(function(){
        
    finalprice+=parseInt($(this).attr('total'));
    console.log(finalprice)
})
$("#finalprice").html(finalprice)




$('#paypal').click(function(){
      let datas=[]
      let i=1;
      if($("#adress").val().length>0){
      $('.media-body').each(function(){
            let ptag=$(this).find('p')
            let data={};
           
              data['ID_Productdetail']=parseInt(ptag[0].getAttribute('data-id'))
           
              datas.push(data)
              
      })
      let index=0;
      $('.product_count>span').each(function(){
            datas[index++]['number']=parseInt($(this).html());
            console.log($(this).html())
  })
      
      console.log(datas)
      let totalPrice;
      totalPrice=parseInt($('#totalprice').html());
      let req={"data":datas,"totalprice":totalPrice,"address":$("#adress").val()};
      console.log(req)
  
      $.ajax({
        headers:{
          authorization:`Bearer ${getCookie('token')}`
      },
          type:'POST',
          url:'http://localhost:8080/api/order',
          contentType:'application/json',
          data:JSON.stringify(req),
          dataType:'json',
          success :function(data){
            console.log(data)
              //window.location.href=`http://localhost:8080/profile/${data}`
          }

      })
    }
    else{
        alert("Nhập địa chỉ giao hàng")
    }
})
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