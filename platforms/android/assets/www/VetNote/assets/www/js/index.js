var pushNotification;
var host = "http://asanapp.com:4321"
var selectedMajor = 11 
var user_token  = window.localStorage.getItem("user_token")




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
            window.localStorage.setItem("token", temp_token);
            window.location.replace("selectPet.html#modal-text");
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
      alert('새로운 퀘스트가 추가되었습니다');
    } else { // background 일 때·
      // otherwise we were launched because the user touched a notification in the notification tray.
      if (e.coldstart){
        alert('새로운 퀘스트가 추가되었습니다');
      } else {
        alert('새로운 퀘스트가 추가되었습니다');
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




if (user_token == null) {
  window.location.replace("./login.html")
}
$(document).ready( function() {

  $.ajax({
    url: host +  "/api/valid_check" ,
    type: "POST",
    data: {
      user_token: user_token
    },
    success: function(data) {
      if (data.error_code ==1) {
        window.localStorage.removeItem("selectedMajorId")
        window.localStorage.setItem("selectedMajorId", data.selected_major_id)
        selected_major_text = ["내과", "마취과", "산과", "안과", "야생동물과", "영상의학과", "일반외과", "임상병리과","임상기초", "정형외과", "피부과"][parseInt(data.selected_major_id) - 1].toString();
        $("span#major_select").text(selected_major_text)
      } else {
        window.localStorage.removeItem("selectedMajorId")
      }

    },
    error : function(XMLHttpRequest, textStatus) {
      if(textStatus == 'timeout'){
        alert("인터넷 연결이 불안정합니다");
        exitBoolean  = confirm("어플리케이션을 종료하시겠습니까?")
        if (exitBoolean == true) {
          navigator.app.exitApp();
        }
      }
    }
  });
})


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

  pushNotification = window.plugins.pushNotification;
  document.addEventListener("Backbutton", onBackKeyDown, false);

}

function onBackKeyDown(){
  exitBoolean  = confirm("어플리케이션을 종료하시겠습니까?")
  if (exitBoolean == true) {
    navigator.app.exitApp();
  }
}


$(document).ready(function (){
//  alert(window.localStorage.getItem("selectedMajorId"))
  //$("#major_select-button").text([" ","내과","마취과" ,"산과", "안과", "야생동물과", "영상의학과", "일반외과", "임상병리과", "임상기초", "정형외과", "피부과"][window.localStorage.getItem("selectedMajorId")])
        

  $('select.major_select option:not(:selected)').attr('disabled',true);


  $.mobile.defaultPageTransition = "slide"
  function tapmove(page_object, destination) {
    tappable(page_object, {
      onTap: function(e, target){
        document.getElementById('main_frame').src = "pages.html" + destination
        $( "#leftpanel_index" ).panel( "close" );
      }
    });
  }
  function tapmove_direct(page_object, destination) {
    tappable(page_object, {
      onTap: function(e, target){
        document.getElementById('main_frame').src = destination
        $( "#leftpanel_index" ).panel( "close" );
      }
    });
  }
  tappable('#notice_btn', function(){

    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.noticeList();
  });

  tappable('#logbook_btn', function(){

    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.go_logbook();
  });
  tappable('#menu', function(){

    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.go_menu();
  });
  tappable("#evaluation", {
    onTap: function(e, target){
      $( "#leftpanel_index" ).panel( "close" );
      var obj = document.getElementById("main_frame");
      var objDoc = obj.contentWindow || obj.contentDocument;
      objDoc.go_evaluation();
    }
  });
  tappable("#logbook_list_large", {
    onTap: function(e, target){
      $( "#leftpanel_index" ).panel( "close" );
      var obj = document.getElementById("main_frame");
      var objDoc = obj.contentWindow || obj.contentDocument;
      objDoc.selectLogbook();
    }
  });
  $( "#leftpanel_index" ).panel({ display: "push" });
  tappable('#menu_lt_index', function(){

    $( "#leftpanel_index" ).panel( "toggle");
  });

  tappable('#report_btn', function(){
    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.go_report();
  });


  tappable('#syllabus', function(){
    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.selectSyllabus();
  });


  tappable('#logout', function(){
    logout_confirm = confirm("정말 로그아웃 하시겠습니까?")
    if (logout_confirm == true) {
       window.localStorage.removeItem("user_token")
    //   alert(window.localStorage.getItem("user_token"))
       parent.window.location.replace("./login.html")
    }

    $( "#leftpanel_index" ).panel( "close");

  });




  //styles
  //
  //


  //styles end

});
