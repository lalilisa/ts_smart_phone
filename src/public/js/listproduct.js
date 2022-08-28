window.load=$.ajax({

  type:'GET',
  url:`${window.location.origin}/api/category`,
  contentType:'application/json',
  dataType:'json',
  success : function(data){
    //category_option
    console.log(data)
    let slect=`<li class="filter-list"><input class="pixel-radio" type="radio" id="men" name="brand" value="all"</label>Tất cả</li>`
    for(let i=0;i<data.length;i++){
      slect+=`  <li class="filter-list"><input class="pixel-radio" type="radio" id="men" name="brand" value=${data[i].id_category}><label for="men">${data[i].name_category.replace(/\b[a-z]/g, m => m.toUpperCase())}</label></li>
       `
        //slect+=`<option value="${data[i].id_category}">${data[i].name_category.replace(/\b[a-z]/g, m => m.toUpperCase())}</option>`
    }
 
    document.getElementById('category_option').innerHTML=slect
    $("#category_option .filter-list >input").click(function(){
      $.ajax({

        type:'GET',
        url:'http://localhost:8080/api/product',
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            let text='';
            let radiochecked_one=$('#category_option .filter-list > input[type=radio]:checked').val()
            let radiochecked_two=$('#filter .filter-list > input[type=radio]:checked').val()
           
           
                
            if (radiochecked_two!==undefined){
              if(radiochecked_two!=="all")
                 data=data.filter( o => o.Brand.toLowerCase()===radiochecked_two.toLowerCase())
            }
            if (radiochecked_one!==undefined){
              if(radiochecked_one!=="all"){
                let id_category=parseInt(radiochecked_one)
                 data=data.filter( o => o.id_category===id_category)
              }
            }
            for(let i=0;i<data.length;i++){
                text+=`
                <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="/product/${data[i].img}" alt="">
                    <ul class="card-product__imgOverlay">
                      <li><button><i class="ti-search"></i></button></li>
                  
                    </ul>
                  </div>
                  <div class="card-body">
                    <p></p>
                    <h4 class="card-product__title"><a href="#">${data[i].Name}</a></h4>
                 
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('row').innerHTML=text
            console.log($("#category_option .filter-list >input[type=radio]:checked").val())
        }
      })  
        
    })

  }
})

window.load=s()
function s(){

    $.ajax({
        type:'GET',
        url:'http://localhost:8080/api/product',
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            let text='';
            console.log(data)
            for(let i=0;i<data.length;i++){
                text+=`
                <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="/product/${data[i].img}" alt="">
                    <ul class="card-product__imgOverlay">
                      <li><button><a class="ti-search" href="/product/${data[i].ID_Product}" style="color:white"></a></button></li>
              
                    </ul>
                  </div>
                  <div class="card-body">
                    <p></p>
                    <h4 class="card-product__title"><a href="/product/${data[i].ID_Product}">${data[i].Name}</a></h4>
             
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('row').innerHTML=text
        }
    })  

}
document.getElementById('row').innerHTML='';
function searchKeyUp(){

    let keyword=$("#search_bar").val();
    console.log(keyword)
    $.ajax({

        type:"GET",
        url:`http://localhost:8080/api/product`,
        contentType:"application/json",
        dataType:"json",
        success :function(data){
            data=data.filter( o=> o.Name.toLowerCase().includes(keyword.toLowerCase()))
            console.log(data)
            let text='';

            for(let i=0;i<data.length;i++){
                text+=`
                <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="/product/${data[i].img}" alt="">
                    <ul class="card-product__imgOverlay">
                    <li><button><a class="ti-search" href="/product/${data[i].ProductID}" style="color:white"></a></button></li>
                      
                    </ul>
                  </div>
                  <div class="card-body">
                    <p></p>
                    <h4 class="card-product__title"><a href="/product/${data[i].ProductID}">${data[i].Name}</a></h4>
                  
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('row').innerHTML=text
        
        }
    })

}
const debounce = (func, delay) => {
  let timerId;
  return function () {
      clearTimeout(timerId)
      timerId = setTimeout(() => func.apply(this, arguments), delay)
  };
};



let textField = document.querySelector('#search_bar');
textField.addEventListener('keyup', debounce(searchKeyUp, 500));






$('#filter .filter-list>input').click(function() {
  $.ajax({

    type:'GET',
    url:'http://localhost:8080/api/product',
    contentType:'application/json',
    dataType:'json',
    success : function(data){
      let text='';
      let radiochecked_one=$('#category_option .filter-list > input[type=radio]:checked').val()
      let radiochecked_two=$('#filter .filter-list > input[type=radio]:checked').val()
     
     
          
      if (radiochecked_two!==undefined){
        if(radiochecked_two!=="all")
           data=data.filter( o => o.Brand.toLowerCase()===radiochecked_two.toLowerCase())
      }
      if(radiochecked_one!=="all"){
        let id_category=parseInt(radiochecked_one)
         data=data.filter( o => o.id_category===id_category)
      }
      for(let i=0;i<data.length;i++){
          text+=`
          <div class="col-md-6 col-lg-4">
          <div class="card text-center card-product">
            <div class="card-product__img">
              <img class="card-img" src="/product/${data[i].img}" alt="">
              <ul class="card-product__imgOverlay">
              <li><button><a class="ti-search" href="/product/${data[i].ProductID}" style="color:white"></a></button></li>

              </ul>
            </div>
            <div class="card-body">
              <p></p>
              <h4 class="card-product__title"><a href="/product/${data[i].ProductID}">${data[i].Name}</a></h4>
             
            </div>
          </div>
        </div>
          `
      }
      document.getElementById('row').innerHTML=text
      console.log($("#category_option .filter-list >input[type=radio]:checked").val())
  }
  })  
});



 