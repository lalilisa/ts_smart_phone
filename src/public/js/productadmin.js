

$.ajax({
    headers:{
      authorization:`Bearer ${getCookie('token')}`  
    },
    type:"get",
    url:`${window.location.origin}/api/product`,
    contentType:"json/appliction",
    dataType:"json",
    success :function(data){
        console.log(data)
        let element=` <div class="show-content" id="column">

                            <div>ID_Product</div>
                            <div class="box2">Name</div>
                            <div> Hãng </div>
                            <div>Giảm giá</div>
                            <div>Action</div>
                      </div>`
        for(let i=0;i<data.length;i++){
            element+=`   
          
            <div class="show-content">
              <div>${data[i].ID_Product}</div>
              <div class="box2">${data[i].Name}</div>
              <div>${data[i].Brand}</div>
              <div>${data[i].Discount+'%'}</div>
              <div>
                  <a href=""><i class="fas fa-pencil-alt"></i></a>
                  <button style="color: black; margin-left: 0.5rem;" onclick="deleteProduct('${data[i].ID_Product}')"><i class="fas fa-times"></i></button >
              </div>
          </div>
         `
        }
        document.getElementById('list_product').innerHTML=element
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
  $.ajax({
    headers:{
      authorization:`Bearer ${getCookie('token')}`  
    },
    type:"get",
    url:`${window.location.origin}/api/product/detail`,
    contentType:"json/appliction",
    dataType:"json",
    success :function(data){
        console.log(data)
        let element=` <div class="show-content" id="column">

                            <div>ID_ProductDetail</div>
                            <div class="box2">Name</div>
                            <div>Màu </div>
                            <div>Giảm giá</div>
                            <div>Action</div>
                      </div>`
        for(let i=0;i<data.length;i++){
            element+=`   
          
            <div class="show-content">
              <div>${data[i].id_detail}</div>
              <div class="box2">${data[i].Name}</div>
              <div>${data[i].color}</div>
              <div>${data[i].price}</div>
              <div>
                  <a href=""><i class="fas fa-pencil-alt"></i></a>
                  <button style="color: black; margin-left: 0.5rem;" onclick="deleteProduct('${data[i].id_detail}')"><i class="fas fa-times"></i></button >
              </div>
          </div>
         `
        }
        document.getElementById('list_detail').innerHTML=element
    }
})

  
  