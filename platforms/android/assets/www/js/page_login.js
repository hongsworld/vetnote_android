host = "http://asanapp.com:4321"


function onNotificationGCM(e) {
  var temp_token =window.localStorage.getItem("temp_token");
  switch( e.event ){
    case 'registered':
    if ( e.regid.length > 0 ) {
      $.ajax({
        url: host + "/user/login_gcm_regi",
        type: "POST",
        timeout: 1000,
        data: {
          gcm_token: e.regid,
          token: temp_token
        },
        success: function(data) {
          if (data.error_code ==0) {
            //여기가 regID를 받는 코드
            window.localStorage.setItem("user_token",temp_token)
            parent.location.href = "index.html"
          }
        },
        error : function(XMLHttpRequest, textStatus) {
          if(textStatus == 'timeout'){
            alert("서버 연결이 원활하지 않습니다")
          }
        }
      });
    }
    break;

    case 'message':
    if (e.foreground) {
      alert('새로운 알림사항이 있습니다');
    } else { // background 일 때·
      // otherwise we were launched because the user touched a notification in the notification tray.
      if (e.coldstart){
        alert('새로운 알림사항이 있습니다');
      } else {
        alert('새로운 알림사항이 있습니다');
      }
    }
    break;

    case 'error':
    alert('MSG:' + e.msg  );
    break;

    default:
    alert('EVENT -> Unknown, an event was received');
    break;
  }
}


function successHandler (result) {
  console.log("result : " + result);
}
function errorHandler (error) {
  alert("error : " + error);
}


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
        alert("로그인 성공")


        //temp_token부여. => 자동 로그인을 위한 게 아니라 gcm regId 등록을 위함
        window.localStorage.setItem("temp_token", data.user_token);
        //푸시등록
        $(document).ready(function(){
          try
          {
            pushNotification = window.plugins.pushNotification;
            pushNotification.register(successHandler, errorHandler, {"senderID":"263938905015","ecb":"onNotificationGCM"});   // required!
          }
          catch(err)
          {
            txt="There was an error on this page.\n\n";
            txt+="Error description: " + err.message + "\n\n";
            alert(txt);
          }
        });
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


document.addEventListener("deviceready", onDeviceReady, false);

var pushNotification
function onDeviceReady() {

  pushNotification = window.plugins.pushNotification;
  document.addEventListener("Backbutton", onBackKeyDown, false);

}


$(document).ready( function() {
  tappable('#submit_login', function(){
      login_ajax()
  });
});
