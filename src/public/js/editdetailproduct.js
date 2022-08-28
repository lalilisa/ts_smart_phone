function deleteDetail(id){
    let ID={};
    ID['id']=id;
    $.ajax({
        type : "Delete",
        contentType : "application/json",
        url : "deleteproductdetail/"+ID.id,
        data : JSON.stringify(ID),
        dataType : 'json',				
        success : function(data) {
            
        }
        
    }) 
}
$(document).ready(function() {
            
    $('#change-detail').submit(function() {
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

  let paramsID=window.location.href.split('/')[5]
  $.ajax({
      headers:{
        authorization:`Bearer ${getCookie('token')}`  
      },
      type:"get",
      url:`${window.location.origin}/api/product/detail/${paramsID}`,
      contentType:"json/appliction",
      dataType:"json",
      success :function(data){
          console.log(data)
          $('#name').val(data.Name)
          $('#color').val(data.color)
          $('#screen').val(data.screen)
          $('#os').val(data.ROM)
          $('#chip').val(data.Chip)
          $('#fontcam').val(data.frontcamera)
          $('#rearcam').val(data.rearcamera)
          $('#pin').val(data.pin)
          $('#price').val(data.price)
          $('#numbers').val(data.numbers)
        
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