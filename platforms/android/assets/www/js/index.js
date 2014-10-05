var host_url = ""
var selectedMajor = 11 

function onLoad() {
document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  document.addEventListener("Backbutton", onBackKeyDown, false);
}

function onBackKeyDown(){

  exitBoolean  = confirm("어플리케이션을 종료하시겠습니까?")
  if (exitBoolean == true) {
    navigator.app.exitApp();
  }
}


$(document).ready(function (){



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

  tappable('#syllabus', function(){
    $( "#leftpanel_index" ).panel( "close");
    var obj = document.getElementById("main_frame");
    var objDoc = obj.contentWindow || obj.contentDocument;
    objDoc.selectSyllabus();
  });





  //styles
  //
  //


  //styles end

});
