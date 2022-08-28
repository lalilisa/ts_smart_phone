

function deleteUser(username){
    var User = {};
  
    console.log(User)
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('token')}`
        },
        type : "Delete",
        contentType : "application/json",
        url : 'http://localhost:8080/api/adminuser/'+username,
     
        dataType : 'json',				
        success : function(data) {
            console.log(data);
            callUser()
        }
        
    })    
};
window.onload=callUser()
function callUser(){
$.ajax({
    headers:{
        authorization:`Bearer ${getCookie('token')}`
    },
    type:"GET",
    url:"http://localhost:8080/api/adminuser",
    contentType:"application/json",
    dataType:"json",
    success:function(response){
            let txt=`            <div class="show-content" id="column">
            <div>Username</div>
            <div class="box2">Email</div>
            <div>role</div>
            <div>Phone</div>
            <div>Action</div>
        </div>
      `
      for(let i=0;i<response.length;i++){
            txt+=`
                <div class="show-content" id="inforUser">
                  <div>${response[i].Username}</div>
                  <div class="box2">${response[i].Email}</div>
                  <div>${response[i].role}</div>
                  <div>${response[i].Phonenumber}</div>
                  <div>
                      <a href="/admin/infor/${response[i].Username}"><i class="fas fa-pencil-alt"></i></a>
                      <button onclick="deleteUser('${response[i].Username}')"> <i class="fas fa-times"></i></button>
                  </div>
              </div>
              `
      }
      document.getElementById('list_user').innerHTML=txt
    },
    error: function(response){
        console.log(response)
        // window.location.href="/"
    }
    
})
}
function searchUser(){
    let info=$("#input_search").val();
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('token')}`
        },
        type:"GET",
        url:"http://localhost:8080/api/adminuser",
        contentType:"application/json",
        dataType:"json",
        success:function(response){
            let filterList=response.filter(o=> o.Username.toLowerCase().includes(info.toLowerCase()))

            let element=`            <div class="show-content" id="column">
                                            <div>Username</div>
                                            <div class="box2">Email</div>
                                            <div>role</div>
                                            <div>Phone</div>
                                            <div>Action</div>
                                        </div>`
            for(let i=0;i<filterList.length;i++){
                    element+=`<div class="show-content" id="inforUser">
                    <div>${filterList[i].Username}</div>
                    <div class="box2">${filterList[i].Email}</div>
                    <div>${filterList[i].Role}</div>
                    <div>${filterList[i].Phonenumber}</div>
                    <div>
                        <a href="inforuser/${filterList[i].Username}"><i class="fas fa-pencil-alt"></i></a>
                        <button onclick="deleteUser('${filterList[i].Username}')"> <i class="fas fa-times"></i></button>
                    </div>
                </div>`
            }
            document.getElementById("list_user").innerHTML=element
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
  
$("#input_search").on('keyup',searchUser)

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