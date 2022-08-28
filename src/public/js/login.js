$("#submit").click(function(){
    var User = {};
    User["username"] = $("#username").val();
    User["password"] = $("#password").val();
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "api/login",
        data : JSON.stringify(User),
        dataType : 'json',				
        success : function(response) {
           
            if(response.message==="Success"){
              
                window.location.href="/";
            }
            else
                $('#status-request').html(response.message).css('color','red')
        }
        
    })    
});