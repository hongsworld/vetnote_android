host = "http://asanapp.com:4321"
function login_ajax() {
  $.ajax({
    url: host + "/api/app_login" ,
    type: "POST",
    data: {
      id: $("#id_form").val(),
      password: $("#password_form").val()
    },
    success: function(data) {
      if (data.error_code ==1) {
        alert("성공")
        alert(data.user_token)
        window.localStorage.setItem("user_token",data.user_token)
        alert(window.localStorage.getItem("user_token"))
        parent.location.href = "index.html"
      } else if (data.error_code == 2) {
        alert("교수자 계정입니다")
      } else if (data.error_code == 3) {
        alert("미인증 계정입니다")
      } else if (data.error_code == 4) {
        alert("관리자 계정입니다")
      } else if (data.error_code == -1) {
        alert("아이디와 비밀번호가 일치하지 않습니다")
      } else {
        alert(data.error_msg);
      }
    }
  });
}

$(document).ready( function() {
  tappable('#submit_login', function(){
      login_ajax()
  });
});