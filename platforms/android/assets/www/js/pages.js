var host = "http://asanapp.com:4321"
var user_token  = window.localStorage.getItem("user_token")
//임시 토큰 

  function go_report() {
    $.ajax({
      url: host + "/api/report",
      type:"POST",
      data: {
        user_token : user_token
      },
      success: function(data) {
        $("#report_loglist").html("")
        for (i = 0; i < data.title.length; i++) {
          $("#report_loglist").append(" " +

            "<div class = 'each_report_log_box' id='each_report_log_box' value=" + data.log_id[i] + ">" +
              "<div class = 'report_log_lt'>" +
                "<div class = 'report_log_title'>" +
                  "<div class = 'report_log_memo_txt'>" +
                    data.log_date[i] + " " + data.title[i] + 
                  "</div>"  +
                "</div>" +
                "<div class = 'report_log_memo'>" +
                  "<div class ='report_log_memo_txt'>" + data.memo[i] + "</div>" +
                "</div>" +        
              "</div>" +
              "<div class = 'report_log_rt'>" +
                "<div class = 'report_log_pic' style=background-image:url('" + host + "/img/" + data.img[i] + "') >" +
                "</div>" +
                "<div class = 'report_log_casenumber'> " +
                  "<div class = 'report_log_casenumber_txt'>" + "#" + data.casenumber[i] + "</div>" +
                "</div>" +
              "</div>" +
            "</div>" +

            "")
        }
        comment_text = ""
        for (i = 0; i < data.comment_time.length; i++) {
          comment_text += "시일 : " + data.comment_time[i] + "\n" +
                    "성찰일지 : " + data.comment1[i] + "\n" + 
                    "실습 외 활동 : " + data.comment2[i] +"\n\n"
        }
        $("#report_comment").val(comment_text)
        $("#report_range_date").text(data.start_date + " - " + data.last_date)
        location.replace("pages.html#report")
      }
    })
  }


  function go_evaluation() {
    window.localStorage.setItem("layer",0)
    window.localStorage.setItem("depth",0)
    console.log("wtf")
    location.replace("pages.html#evaluation")
  }
  function go_menu() {
    window.localStorage.setItem("layer",1)
    window.localStorage.setItem("depth",0)
    $.ajax({
      url: host + "/api/menu" ,
      type: "POST",
      data: {
      },
      success: function(data) {
        $("#menu_box").html("")
        if (data.error_code ==1) {
          for (i = 0; i < data.day_array.length; i++) {
            $("#menu_box").append(" " +
              "<div class = 'each_colum' id='colum1'>" +
                "<div class = 'each_colum_lt'>" +
                  "<div class = 'outer'>" +
                    "<div class = 'middle'>" +
                      "<div class = 'inner'>" +
                        "<div class = 'each_colum_lt_txt'>" +
                          data.day_array[i] +
                        "</div> " +
                      "</div> " +
                    "</div> " +
                  "</div> " +
                "</div> " +
                "<div class = 'each_colum_rt'>" +
                  "<div class = 'each_menu'>" +
                    "<div class = 'each_menu_lt lunch'>" +
                    "</div> " +
                    "<div class = 'each_menu_rt'>" +
                      "<div class = 'outer'>" +
                        "<div class = 'middle'>" +
                          "<div class = 'inner'>" +
                            "<div class = 'each_menu_rt_txt'>" +
                              data.lunch_array[i] +
                            "</div> " +
                          "</div> " +
                        "</div> " +
                      "</div> " +
                    "</div> " +
                  "</div> " +
                  "<div class = 'each_menu'>" +
                    "<div class = 'each_menu_lt dinner'>" +
                    "</div> " +
                    "<div class = 'each_menu_rt'>" +
                      "<div class = 'outer'>" +
                        "<div class = 'middle'>" +
                          "<div class = 'inner'>" +
                            "<div class = 'each_menu_rt_txt'>" +
                              data.dinner_array[i] +
                            "</div> " +
                          "</div> " +
                        "</div> " +
                      "</div> " +
                    "</div> " +
                  "</div> " +
                "</div> " +
                "<div class= 'colum_line'>" +
                "</div> " +
              "</div> " +
            " ")
          }
          $("#rightpanel_index").panel("close");
          location.href = "pages.html#menu"
        } else {
          alert(data.error_msg);
        }
      }
    });


  }
  function noticeDetail(id) {
    window.localStorage.setItem("layer",2)
    window.localStorage.setItem("depth",1)
      $.ajax({
        url: host +  "/api/notice_detail" ,
        type: "POST",
        data: {
          noticeId: id
        },
        success: function(data) {
          if (data.error_code ==1) {
            $("#notice_title").text(data.title)
            $("#notice_content").text(data.content)
            $("#notice_created_at").text(data.created_at)
            $( "#leftpanel_index" ).panel( "close" );

            location.href = "pages.html#detail_notice"
          } else {
            alert(data.error_msg);
          }
        }
      });
  }

  function noticeList() {
    window.localStorage.setItem("layer",2)
    window.localStorage.setItem("depth",0)
    $.ajax({
      url: host +  "/api/notice_list" ,
      type: "POST",
      data: {
        selectedMajorId: window.localStorage.getItem("selectedMajorId")
      },
      success: function(data) {
        if (data.error_code ==1) {
          $("#notice_box").html("")
          for (i = 0; i < data.title.length; i++) {
            if (i == 0) {
              $("#notice_box").append(" " +
                "<div class = 'each_notice_top' id='each_notice' value='" + data.notice_id[i] + "'>" +
                  "<div class ='each_notice_title'>" +
                    "<div class = 'outer'>" +
                      "<div class = 'middle'>" +
                        "<div class = 'inner'>" +
                          "<div class = 'each_notice_title_txt'>" +
                            data.title[i] +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                  "<div class = 'each_notice_date'>" +
                    "<div class = 'outer'>" +
                      "<div class = 'middle'>" +
                        "<div class = 'inner'>" +
                          "<div class = 'each_notice_date_txt'>" +
                            data.created_at[i] +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              " ")
            } else {
              $("#notice_box").append(" " +
                "<div class = 'each_notice' id='each_notice' value='" + data.notice_id[i] + "'>" +
                  "<div class ='each_notice_title'>" +
                    "<div class = 'outer'>" +
                      "<div class = 'middle'>" +
                        "<div class = 'inner'>" +
                          "<div class = 'each_notice_title_txt'>" +
                            data.title[i] +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                  "<div class = 'each_notice_date'>" +
                    "<div class = 'outer'>" +
                      "<div class = 'middle'>" +
                        "<div class = 'inner'>" +
                          "<div class = 'each_notice_date_txt'>" +
                            data.created_at[i] +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              " ")
            }

          }
          location.href = "pages.html#notice"
        } else {
          alert(data.error_msg);
        }
      }
    });
  }

  function syllabus(majorId) {
    window.localStorage.setItem("layer",3)
    window.localStorage.setItem("depth",0)   
    if (majorId == null) {
      var selectedMajorId = window.localStorage.getItem("selectedMajorId")
    } else {
      var selectedMajorId = majorId
    }
    $.ajax({
      url: host +  "/api/syllabus" ,
      type: "POST",
      data: {
        major_id: selectedMajorId
      },
      success: function(data) {
        if (data.error_code ==1) {
          for (i = 0; i < 10; i++) {
           $("#colum" + (parseInt(i) + 1) ).find(".each_colum_rt").find(".each_colum_rt_txt").text(data.colum[i])
          }
          location.href = "pages.html#syllabus"
        } else {
          alert(data.error_msg);
        }
      }
    });
  }


  function selectLogbook() {
    window.localStorage.setItem("layer",3)
    window.localStorage.setItem("depth",1)
    $.ajax({
      url: host +  "/api/major_list" ,
      type: "POST",
      data: {
        selectedMajorId: window.localStorage.getItem("selectedMajorId")
      },
      success: function(data) {
        if (data.error_code ==1) {
          $("#selectLogbook_list").html("")
          for (i = 0; i < data.major_id.length; i++) {
            $("#selectLogbook_list").append(" " +
              "<div class = 'each_log_list' id='each_selectLogbook' value='" + data.major_id[i] + "'>" +
                  "<div class = 'outer'>" +
                    "<div class = 'middle'>" +
                      "<div class = 'inner'>" +
                        "<div class = 'each_major_list'>" +
                          data.major_name[i] +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
              "</div>" +
            " ")
          }
          location.href = "pages.html#selectLogbook"
        } else {
          alert(data.error_msg);
        }
      }
    });
  }

  function selectSyllabus() {
    window.localStorage.setItem("layer",4)
    window.localStorage.setItem("depth",0)
    $.ajax({
      url: host +  "/api/major_list" ,
      type: "POST",
      data: {
        selectedMajorId: window.localStorage.getItem("selectedMajorId")
      },
      success: function(data) {
        if (data.error_code ==1) {
          $("#selectSyllabus_list").html("")
          for (i = 0; i < data.major_id.length; i++) {
            $("#selectSyllabus_list").append(" " +
              "<div class = 'each_log_list' id='each_selectSyllabus' value='" + data.major_id[i] + "'>" +
                  "<div class = 'outer'>" +
                    "<div class = 'middle'>" +
                      "<div class = 'inner'>" +
                        "<div class = 'each_major_list'>" +
                          data.major_name[i] +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
              "</div>" +
            " ")
          }
          location.href = "pages.html#selectSyllabus"
        } else {
          alert(data.error_msg);
        }
      }
    });
  }


  function questSmall(target) { 
    window.localStorage.setItem("layer",5)
    window.localStorage.setItem("depth",2)
        $.ajax({
          url: host +  "/quest/small" ,
          type: "POST",
          data: {
            questId:$(target).attr("value")
          },
          success: function(data) {
            if (data.error_code ==1) {
              $("#questlarge_title").text(data.large_title)
              $("#questsmall_list").html("")
              $("#logbook_major_name_detail").text(data.major)
              for (i = 0; i < data.title.length; i++) {
                $("#questsmall_list").append(" " +
                  "<div class = 'log_detail_body_box_each'>" +
                    "<div class = 'each_log_list_lt'>" +
                      "<div class = 'outer'>" +
                        "<div class = 'middle'>" +
                          "<div class = 'inner'>" +
                            "<div class = 'each_log_list_lt_txt '>" +
                              (parseInt(i)+1) +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class = 'each_log_list_rt'>" +
                      "<div class = 'each_log_list_rt_txt'>" +
                        data.title[i] +
                      "</div>" +
                    "</div>" +
                    "<div class = 'clear'>" +
                    "</div>" +
                  "<div class = 'by_log_by'>" +
                    "<div class = 'by_log_by_inner absolute_center'>" +
                    "</div>" +
                  "</div>" +
              "")}

              location.href= "pages.html#log_detail"
            } else {
              alert(data.error_msg);
            }
          }
        });
  }

  function questLarge(majorId) {
    window.localStorage.setItem("layer",5)
    window.localStorage.setItem("depth",1)
    if (majorId == null) {
      var selectedMajorId = window.localStorage.getItem("selectedMajorId")
    } else {
      var selectedMajorId = majorId
    }
    $.ajax({
      url: host +  "/quest/large" ,
      type: "POST",
      data: {
        selectedMajorId: selectedMajorId
      },
      success: function(data) {
        if (data.error_code ==1) {
          $("#questlarge_list").html("")
          $("#logbook_major_name_list").text(data.major_name)
          for (i = 0; i < data.title.length; i++) {
            $("#questlarge_list").append(" " +
              "<div class = 'each_log_list2' id='each_quest' value='" + data.quest_id[i] + "'>" +
                "<div class = 'each_log_list_lt'>" +
                  "<div class = 'outer'>" +
                    "<div class = 'middle'>" +
                      "<div class = 'inner'>" +
                        "<div class = 'each_log_list_lt_txt'>" +
                          (parseInt(i) + 1) +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
                "<div class = 'each_log_list_rt'>" +
                  "<div class = 'outer'>" +
                    "<div class = 'middle'>" +
                      "<div class = 'inner'>" +
                        "<div class = 'each_log_list_rt_txt'>" +
                          data.title[i] +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>" +
            " ")
          }
          location.href = "pages.html#log_list"
        } else {
          alert(data.error_msg);
        }
      }
    });
  }


    function go_back() {
        window.history.back()
    }

    function style() {
      var cw = $('div.new_logbook').height();
      $('div.new_camera_ic').css({'width':cw+'px'});  
    }
    
    function tapmove(page_object, destination,history) {
      tappable(page_object, {
        onTap: function(e, target){
          if (history == 1){
            location.href = destination
          } else { 
            location.replace(destination)
          }
        }
      });
    }

    function go_logbook(date) {
    window.localStorage.setItem("layer",5)
    window.localStorage.setItem("depth",0)
      $.ajax({
        url: host +  "/api/daily_logbook" ,
        type: "POST",
        data: {
          selectedMajorId: window.localStorage.getItem("selectedMajorId"),
          date: date,
          token: user_token
        },
        success: function(data) {
          if (data.error_code ==1) {
            if (data.log_title.length == 0 ) {
              if (date == null) {
                $("#logbook_list").html(" " + 
                  "<div class = 'new_logbook'>" +
                    "<div class = 'new_camera_ic'>" +
                    "</div>" +
                    "<div class = 'calc_new_text_box'>" + 
                      "<div class= 'new_text_box' id='logbook_list_btn'>" +
                        "<div class ='new_text_box_top'>" +
                          "<div class = 'new_text_box_top_txt'>" +
                            "로그북을 기록해주세요" +
                          "</div>" +
                          "<div class = 'new_text_box_top_time'>" +
                          "</div>" +
                        "</div>" +
                        "<div class ='new_text_box_bottom'>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                  " ");
              } else {
                $("#logbook_list").html(" " + 
                  "<div class = 'new_logbook'>" +
                    "<div class = 'new_camera_ic'>" +
                    "</div>" +
                    "<div class = 'calc_new_text_box'> " +
                      "<div class= 'new_text_box' >" +
                        "<div class ='new_text_box_top'>" +
                          "<div class = 'new_text_box_top_txt'>" +
                            "이 날 기록된 로그가 없습니다" +
                          "</div>" +
                          "<div class = 'new_text_box_top_time'>" +
                          "</div>" +
                        "</div>" +
                        "<div class ='new_text_box_bottom'>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                  " ");
              }
            } else {
              $("#logbook_list").html("")
              for (i = 0; i < data.log_title.length; i++) {
                if (data.log_picture_url == []) {
                  if (data.check_code[i] ==0){
                    $("#logbook_list").append(" " +
                      "<div class = 'new_logbook'>" +
                        "<div class = 'calc_new_text_box'>" +
                          "<div class= 'new_text_box' id='each_userquest' value='" + data.userQuestId[i]  + "'>" +
                            "<div class ='new_text_box_top'>" +
                              "<div class = 'new_text_box_top_txt'>" +
                                "#" + data.log_case_number[i] + "<br> " + data.log_title[i] + 
                              "</div>" +
                              "<div class = 'new_text_box_top_time' style='margin-bottom:0'>" +
                                data.log_time[i] +
                              "</div>" +
                              "<div class = 'new_text_box_top_time' >" +
                                data.memo[i] +
                              "</div>" +
                            "</div>" +
                            "<div class ='new_text_box_bottom'>" +
                              "<div class = 'outer'>" +
                                "<div class = 'middle'>" +
                                  "<div class = 'inner'>" +
                                    "<div class = 'new_text_box_bottom_txt '>"+
                                        "검토중"+
                                    "</div>" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    " ");
                  } else {
                    $("#logbook_list").append(" " +
                      "<div class = 'new_logbook'>" +
                        "<div class = 'calc_new_text_box'>" +
                          "<div class= 'new_text_box' id='each_userquest' value='" + data.userQuestId[i]  + "'>" +
                            "<div class ='new_text_box_top'>" +
                              "<div class = 'new_text_box_top_txt'>" +
                                "#" + data.log_case_number[i] + "<br> " + data.log_title[i] + 
                              "</div>" +
                              "<div class = 'new_text_box_top_time' style='margin-bottom:0'>" +
                                data.log_time[i] +
                              "</div>" +
                              "<div class = 'new_text_box_top_time' >" +
                                data.memo[i] +
                              "</div>" +
                            "</div>" +
                            "<div class ='new_text_box_bottom'>" +
                              "<div class = 'outer'>" +
                                "<div class = 'middle'>" +
                                  "<div class = 'inner'>" +
                                    "<div class = 'new_text_box_bottom_txt '>"+
                                        "검토완료"+
                                    "</div>" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    " ");

                  }
                } else {
                  if (data.check_code[i] ==0) {
                    $("#logbook_list").append(" " +
                      "<div class = 'new_logbook'>" +
                        "<div class = 'new_camera_ic' style=background-image:url('" + host + "/img/" + data.log_picture_url[i]  + "')>" +
                        "</div>" +
                        "<div class = 'calc_new_text_box'> " +
                          "<div class= 'new_text_box' id='each_userquest' value='" + data.userQuestId[i]  + "'>" +
                            "<div class ='new_text_box_top'>" +
                              "<div class = 'new_text_box_top_txt'>" +
                                "#" + data.log_case_number[i] + "<br> " + data.log_title[i] + 
                              "</div>" +
                              "<div class = 'new_text_box_top_time' style='margin-bottom:0'>" +
                                data.log_time[i] +
                              "</div>" +
                              "<div class = 'new_text_box_top_time' >" +
                                data.memo[i] +
                              "</div>" +
                            "</div>" +
                            "<div class ='new_text_box_bottom'>" +
                              "<div class = 'outer'>" +
                                "<div class = 'middle'>" +
                                  "<div class = 'inner'>" +
                                    "<div class = 'new_text_box_bottom_txt '>" +
                                      "검토중" +
                                    "</div>" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    " ");
                  } else {
                    $("#logbook_list").append(" " +
                      "<div class = 'new_logbook'>" +
                        "<div class = 'new_camera_ic' style=background-image:url('" + host + "/img/" + data.log_picture_url[i]  + "')>" +
                        "</div>" +
                        "<div class = 'calc_new_text_box'> " +
                          "<div class= 'new_text_box' id='each_userquest' value='" + data.userQuestId[i]  + "'>" +
                            "<div class ='new_text_box_top'>" +
                              "<div class = 'new_text_box_top_txt'>" +
                                "#" + data.log_case_number[i] + "<br> " + data.log_title[i] + 
                              "</div>" +
                              "<div class = 'new_text_box_top_time' style='margin-bottom:0'>" +
                                data.log_time[i] +
                              "</div>" +
                              "<div class = 'new_text_box_top_time' >" +
                                data.memo[i] +
                              "</div>" +
                            "</div>" +
                            "<div class ='new_text_box_bottom'>" +
                              "<div class = 'outer'>" +
                                "<div class = 'middle'>" +
                                  "<div class = 'inner'>" +
                                    "<div class = 'new_text_box_bottom_txt '>" +
                                      "검토완료" +
                                    "</div>" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    " ");                    
                  }
                }
              }
              $( "#leftpanel_index" ).panel( "close" );
            }
            style();
            if (data.wait != true) {
            location.href = "pages.html#index"
            }
          } else {
            alert(data.error_msg);
          }
        }
      });
    }



    function go_comment(date) {    
    window.localStorage.setItem("layer",6)
    window.localStorage.setItem("depth",0)
      $.ajax({
        url: host +  "/api/daily_comment" ,
        type: "POST",
        data: {
          selectedMajorId: window.localStorage.getItem("selectedMajorId"),
          date: date,
          token: user_token

        },
        success: function(data) {
          if (data.error_code ==1)  {

            if (data.wait == true) {
            } else {
              $("#textarea_student_comment1").text(data.student_comment1)
              $("#textarea_student_comment2").text(data.student_comment2)
              $("#comment_loglist").html("")
              //로그북 없을때
              if (data.comment_logtitle==""){

                $("#comment_loglist").append("<div class = 'calender_box' style='margin-top:10px; margin-bottom:20px;'> " +
                  "<div class = 'outer'>" +
                      "<div class = 'middle'>" +
                        "<div class = 'inner'>" +
                          "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>" +
                            "작성된 로그북이 없습니다" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  "</div> ")
              }else{
                for (i = 0; i < data.comment_logtitle.length; i++) {
                  //로그북은 있는데 메모 없을때
                  if (data.comment_logmemo=="" && data.comment_logpictureurl!=""){
                    image_url = host + "/img/" + data.comment_logpictureurl[i]
                    $("#comment_loglist").append("" +
                      "<div class = 'calender_box' style='margin-top:10px; margin-bottom:0px;'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = 'inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                  "#" + (i + 1) +  data.comment_logtitle[i] +
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                      "</div> "+
                      "<div class = 'calender_box' style='margin-top:0px; margin-bottom:0px; border-top:0;'>"+
                        "<div class = 'calender_box-lt'>"+
                          "<div style='padding:20px'>"+
                            "케이스번호"+
                          "</div>"+
                        "</div>"+
                        "<div class = 'calender_box-rt'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = ' inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                   data.comment_case[i]+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class = 'calender_box' style='margin-top:0px; border-top:0px;min-height:90px; height:auto;'>"+
                        "<div class='log_img' style='position:relative; height:auto;background-image:url(" + image_url + "); background-position:center; background-size:100%; background-position:center;background-repeat:no-repeat;'>"+
                        "</div>"+
                   

               
                      "</div>"+

                    "")
                    $(document).ready(function() {
                      $('.log_img').height($('.log_img').width());
                      console.log($('.log_img').width())
                    })
                  }else if (data.comment_logmemo=="" && data.comment_logpictureurl==""){
                    $("#comment_loglist").append("" +
                      "<div class = 'calender_box' style='margin-top:10px; margin-bottom:0px;'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = 'inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                  "#" + (i + 1) +  data.comment_logtitle[i] +
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                      "</div> "+
                      "<div class = 'calender_box' style='margin-top:0px; margin-bottom:0px; border-top:0;'>"+
                        "<div class = 'calender_box-lt'>"+
                          "<div style='padding:20px'>"+
                            "케이스번호"+
                          "</div>"+
                        "</div>"+
                        "<div class = 'calender_box-rt'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = ' inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                   data.comment_case[i]+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                    "")

                  } else if (data.comment_logmemo!="" && data.comment_logpictureurl!=""){
                    image_url = host + "/img/" + data.comment_logpictureurl[i]
                    $("#comment_loglist").append("" +
                      "<div class = 'calender_box' style='margin-top:10px; margin-bottom:0px;'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = 'inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                  "#" + (i + 1) + " " +  data.comment_logtitle[i] +
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                      "</div> "+
                      "<div class = 'calender_box' style='margin-top:0px; margin-bottom:0px; border-top:0;'>"+
                        "<div class = 'calender_box-lt'>"+
                          "<div style='padding:20px'>"+
                            "케이스번호"+
                          "</div>"+
                        "</div>"+
                        "<div class = 'calender_box-rt'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = ' inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                   data.comment_case[i]+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class = 'calender_box' style='margin-top:0px; border-top:0px;min-height:90px; height:auto;'>"+
                        "<div class='log_img' style='position:relative; height:auto;background-image:url(" + image_url + "); background-position:center; background-size:100%; background-position:center;background-repeat:no-repeat;'>"+
                        "</div>"+
                        "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px 20px 20px 40px;  min-height:90px;'>"+
                          "<div style='position:realtive; white-space:pre-line; word-wrap:break-word; '>" + data.comment_logmemo[i] + "</div>"+
                        "</div>"+
                      "</div>"+
                    "")
                  } else {
                    $("#comment_loglist").append("" +
                      "<div class = 'calender_box' style='margin-top:10px; margin-bottom:0px;'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = 'inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                  "#" + (i + 1) + " " +  data.comment_logtitle[i] +
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                      "</div> "+
                      "<div class = 'calender_box' style='margin-top:0px; margin-bottom:0px; border-top:0;'>"+
                        "<div class = 'calender_box-lt'>"+
                          "<div style='padding:20px'>"+
                            "케이스번호"+
                          "</div>"+
                        "</div>"+
                        "<div class = 'calender_box-rt'>"+
                          "<div class = 'outer'>"+
                            "<div class = 'middle'>"+
                              "<div class = ' inner'>"+
                                "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px;'>"+
                                   data.comment_case[i]+
                                "</div>"+
                              "</div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                      "<div class = 'calender_box' style='margin-top:0px; border-top:0px;min-height:90px; height:auto;'>"+
                        "<div class='calender_box_rt_txt' style='text-align:left; color:#9f9fa0; padding:20px 20px 20px 40px;  min-height:90px;'>"+
                          "<div style='position:realtive; white-space:pre-line; word-wrap:break-word; '>" + data.comment_logmemo[i] + "</div>"+
                        "</div>"+
                      "</div>"+
                    "")

                  }
                }
              }
              $(document).ready(function() {
                temp_width = $(window).width()-52
                $('div.log_img').height(temp_width);
                $('div.log_img').width(temp_width);
              })
              $( "#leftpanel_index" ).panel( "close" );
              location.href = "pages.html#comment"
            }
          } else {
            alert(data.error_msg);
          }
        }
      });
    }

    function go_qna() {
    window.localStorage.setItem("layer",7)
    window.localStorage.setItem("depth",0)
//      window.localStorage.setItem("selectedMajorId", 1);
      $.ajax({
        url: host +  "/qna/list" ,
        type: "POST",
        data: {
          selectedMajorId: window.localStorage.getItem("selectedMajorId"),
        },
        success: function(data) {
          if (data.error_code ==1) {
            if (data.writer.length == 0 ) {

            } else {
              $("#qna_list_box").html("")
              for (i = 0; i < data.writer.length; i++) {
                if (data.writer[i] == -1) {
                  $("#qna_list_box").append(" " + 
                    "<div class = 'new_logbook'>" +
                      "<div class = 'new_camera_ic' style=background-image:url('" + host + "/qna_img/" + data.qna_picture_url[i] + "')>" +
                      "</div>" +
                      "<div class = 'calc_new_text_box_mine'> " +
                        "<div class= 'new_text_box_mine' id='each_qna_list' value='" + data.qna_id[i] + "'>" +
                          "<div class ='new_text_box_top'>" +
                            "<div class = 'new_text_box_top_txt_mine'>" +
                              "나의 질문" +
                            "</div>" +
                            "<div class = 'new_text_box_top_content_mine'> " +
                              data.title[i] +
                            "</div>" +
                            "<div class = 'new_text_box_top_time_mine'>" +
                              data.qna_date[i] +
                            "</div>" +
                          "</div>" +
                          "<div class ='new_text_box_bottom'>" +
                            "<div class = 'outer'>" +
                              "<div class = 'middle'>" +
                                "<div class = 'inner'>" +
                                  "<div class = 'new_text_box_bottom_txt_mine '>" +
                                    "검토중" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  " ");
                } else {

                  $("#qna_list_box").append(" " + 
                    "<div class = 'new_logbook'>" +
                      "<div class = 'new_camera_ic'>" +
                      "</div>" +
                      "<div class = 'calc_new_text_box'>" + 
                        "<div class= 'new_text_box' id='each_qna_list' value='" + data.qna_id[i] + "'>" +
                          "<div class ='new_text_box_top'>" +
                            "<div class = 'new_text_box_top_txt'>" +
                               data.writer[i] + "의 질문" +
                            "</div>" +
                            "<div class = 'new_text_box_top_content'> " +
                              data.title[i] +
                            "</div>" +
                            "<div class = 'new_text_box_top_time'>" +
                              data.qna_date[i] +
                            "</div>" +
                          "</div>" +
                          "<div class ='new_text_box_bottom'>" +
                            "<div class = 'outer'>" +
                              "<div class = 'middle'>" +
                                "<div class = 'inner'>" +
                                  "<div class = 'new_text_box_bottom_txt '>" +
                                    "검토중" +
                                  "</div>" +
                                "</div>" +
                              "</div>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                  " ");
                }
              }
              $( "#leftpanel_index" ).panel( "close" );
            }
            style();
            location.href = "pages.html#qna"
          } else {
            alert(data.error_msg);
          }
        }
      });

    }

  function qnaDetail(id) {
    window.localStorage.setItem("layer",7)
    window.localStorage.setItem("depth",1)    
      $.ajax({
        url: host +  "/qna/detail" ,
        type: "POST",
        data: {
          selectedQnaId: window.localStorage.getItem("selectedQnaId")
        },
        success: function(data) {
          if (data.error_code ==1) {
            $("#qna_detail_title").text(data.title)
            $("#qna_detail_content").text(data.content)
            if (data.picture_url != null) {
              $("#detail_picture_box").removeClass("detail_picture_box-none").addClass("detail_picture_box");
              $("#detail_picture_box").css("background-image","url('" + host + "/qna_img/" + data.picture_url + "')")
            }
            $( "#leftpanel_index" ).panel( "close" );

            if (data.modify_auth == true) {
              $("#modify_qna").css("display","initial")
            } else {
              $("#modify_qna").css("display","none")
            }
            location.href = "pages.html#qna_detail"
          } else {
            alert(data.error_msg);
          }
        }
      });
  }

  function qnaSubmit(id) {
      selectedQuest = window.localStorage.getItem("selectedQuest");
      console.log("start")
      $("#hidden_title").val($("#input_title").val())
      $("#hidden_content").val($("#input_content").val())
      $("#hidden_major_id").val(window.localStorage.getItem("selectedMajorId"))
      console.log($("#case_number").val())
      var formData = new FormData($('#formData_qna')[0])
      formData.append("token", user_token)
      $.ajax(
      {
        type: "POST",
        url: host +  '/qna/write',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 25000,
        beforeSend: function(data){
          console.log("fire")
        },
        success: function (data) {
          if (data.error_code == 1){
            alert("성공적으로 등록되었습니다")
            go_qna();
          }
        },
        error: function(data)
        {
            alert("등록에 실패하였습니다")
        }
      });
  }


  function qnaModify(id) {
    window.localStorage.setItem("layer",7)
    window.localStorage.setItem("depth",1)   
      $.ajax({
        url: host +  "/qna/modify" ,
        type: "POST",
        data: {
          selectedQnaId: window.localStorage.getItem("selectedQnaId")
        },
        success: function(data) {
          if (data.error_code ==1) {
            $("#input_title-modify").val(data.title)
            $("#input_content-modify").text(data.content)
            if (data.picture_url != null) {
              $("#detail_picture_box").removeClass("detail_picture_box-none").addClass("detail_picture_box");
              $("#detail_picture_box").css("background-image","url('" + host + "/qna_img/" + data.picture_url + "')")
            }
            $( "#leftpanel_index" ).panel( "close" );
            location.href = "pages.html#qna_modify"
          } else {
            alert(data.error_msg);
          }
        }
      });
  }


  function qnaModifyProcess(id) {
      selectedQnaId = window.localStorage.getItem("selectedQnaId")
      console.log("start")
      $("#hidden_title-modify").val($("#input_title-modify").val())
      $("#hidden_content-modify").val($("#input_content-modify").val())
      $("#hidden_qna_id-modify").val(selectedQnaId)
      var formData = new FormData($('#formData_qna-modify')[0])
      formData.append("token", user_token)

      $.ajax(
      {
        type: "POST",
        url: host +  '/qna/modify_process',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 25000,
        beforeSend: function(data){
          console.log("fire")
        },
        success: function (data) {
          if (data.error_code == 1){
            alert("성공적으로 수정되었습니다")
            go_qna();
          }
        },
        error: function(data)
        {
            alert("등록에 실패하였습니다")
        }
      });
  }


  function qnaDelete(id) {
    var check = confirm("정말 삭제하시겠습니까? ")
    if (check == true) {
      $.ajax({
        url: host +  "/qna/delete" ,
        type: "POST",
        data: {
          selectedQnaId: window.localStorage.getItem("selectedQnaId")
        },
        success: function(data) {
          if (data.error_code ==1) {
            alert("삭제되었습니다")
            go_qna();
          } else {
            alert(data.error_msg);
          }
        }
      });
    } else {
      false
    }
  }



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;


  $(document).ready(function (){

    function localCamera(target,input){
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: $(window).width(),
        targetHeight: $(window).width()
      });
      function onSuccess(imageData,target,input) {
        var image = $(target)
        image.css("background-image", "url('" + "data:image/jpeg;base64," + imageData + "')");
        image.css("background-repeat","no-repeat");
        image.css("background-position", "center center");
        image.css("background-size","100%")
        $(input).val(imageData);

      }

      function onFail(message) {
          alert('사진 등록이 실패하였습니다 : ' + message);
      }
    }


  //초기 해당 전공 설정
 //   window.localStorage.setItem("selectedMajorId", 1);
 //index에서 ajax로 전공 정보 받아오기로 처리 
    $.mobile.defaultPageTransition = "fade"

  //start
    go_logbook()

  // upper tab
    tapmove("#logbook_btn", "#index")
    tappable(".each_log_list_lt_arrow", {
      onTap: function(e, target){
        go_back()
      }
    });


    tappable("#comment_btn", {
      onTap: function(e, target){
        go_comment()
      }
    });
    tappable("#qna_btn", {
      onTap: function(e, target){
        go_qna()
      }
    });
  //selectLogbook
    tappable("#each_selectLogbook", {
      onTap: function(e, target){
        questLarge($(target).attr("value"))
      }
    });
  //selectSyllabus
    //
    tappable("#each_selectSyllabus", {
      onTap: function(e, target){
        syllabus($(target).attr("value"))
      }
    });

  //selectNotice
    tappable("#each_notice", {
      onTap: function(e, target){
        noticeDetail($(target).attr("value"))
      }
    });


  //qna page
    tapmove("#qna_write_btn", "#qna_write",1)
    tapmove("#cancel_qna", "#qna")

    tappable("#each_qna_list", {
      onTap: function(e, target){
        window.localStorage.setItem("selectedQnaId",null);
        selectedQnaId = window.localStorage.setItem("selectedQnaId", $(target).attr("value")) 
        qnaDetail(selectedQnaId)
      }
    });

    tappable('#submit_qna', function(){
      qnaSubmit()
    });

    //modify qna
    tappable("#modify_qna", {
      onTap: function(e, target){
        qnaModify();
      }
    });
    //modify process qna
    tappable("#modify_process_qna_btn", {
      onTap: function(e, target){
        qnaModifyProcess();
      }
    });
    //cancel modifying qna
    tappable("#cancel_qna-modify", {
      onTap: function(e, target){
        go_back()
      }
    });

    //delete qna
    tappable("#delete_qna", {
      onTap: function(e, target){
        qnaDelete();
      }
    });
    





  //comment page
    tapmove("#comment_write_btn", "#comment_write",1)
    tapmove("#cancel_comment", "#comment")
    //submit comment
    tappable("#submit_comment", {
      onTap: function(e, target){
      
        $.ajax({
          url: host +  "/api/submit_comment" ,
          type: "POST",
          data: {
            selectedMajorId: window.localStorage.getItem("selectedMajorId"),
            student_comment1: $("#textarea_student_comment1").val(),
            student_comment2: $("#textarea_student_comment2").val(),
            token: user_token 
          },
          success: function(data) {
            if (data.error_code ==1) {
              go_comment()
              alert("실습일지가 성공적으로 저장되었습니다")
            } else {
              alert(data.error_msg);
            }
          }
        });
      }
    });

  // logbook

    //큰 퀘스트 목록 보기 
    tappable("#logbook_list_btn", {
      onTap: function(e, target){
        questLarge();
      }
    });

    //기록된 로그 세부 보기

    tappable("#each_userquest", {
      onTap: function(e, target){
        window.localStorage.setItem("selectedUserQuest", $(target).attr("value"));
        $.ajax({
          url: host +  "/quest/read_userquest" ,
          type: "POST",
          data: {
            userQuestId:$(target).attr("value")
          },
          success: function(data) {
            if (data.error_code ==1) {
              $("#div_log_memo").text(data.memo)
              $("#questlarge_title-recorded_log").text(data.large_title)
              $("#questsmall_list-recorded_log").html("")
              for (i = 0; i < data.title.length; i++) {
                $("#questsmall_list-recorded_log").append(" " +
                  "<div class = 'log_detail_body_box_each'>" +
                    "<div class = 'each_log_list_lt'>" +
                      "<div class = 'outer'>" +
                        "<div class = 'middle'>" +
                          "<div class = 'inner'>" +
                            "<div class = 'each_log_list_lt_txt '>" +
                              (parseInt(i)+1) +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class = 'each_log_list_rt'>" +
                      "<div class = 'each_log_list_rt_txt'>" +
                        data.title[i] +
                      "</div>" +
                    "</div>" +
                    "<div class = 'clear'>" +
                    "</div>" +
                  "<div class = 'by_log_by'>" +
                    "<div class = 'by_log_by_inner absolute_center'>" +
                    "</div>" +
                  "</div>" +
              "")}
              if (data.picture_url != null) {
                $("#detail_picture_box-recorded_log").removeClass("detail_picture_box-none").addClass("detail_picture_box");
                $("#detail_picture_box-recorded_log").css("background-image","url('" + host  +"/img/" + data.picture_url + "')")
              }else{
                $("#detail_picture_box-recorded_log").css("display","none")  
              }
              $("#case_number-recorded_log").text("Case # " + data.case_number);
              location.href= "pages.html#recorded_log_detail"
            } else {
              alert(data.error_msg);
            }
          }
        });
      }
    });

    tappable("#delete_userquest", {
      onTap: function(e, target){
        var check = confirm("정말 삭제하시겠습니까?")
        if (check == true) {
          selectedUserQuest =  window.localStorage.getItem("selectedUserQuest");
          $.ajax({
            url: host +  "/quest/delete_userquest" ,
            type: "POST",
            data: {
              userQuestId:selectedUserQuest
            },
            success: function(data) {
              if (data.error_code ==1) {
                go_logbook();
              } else {
                alert(data.error_msg);
              }
            }
          });
        }
      }
    });


    //세부 퀘스트 목록 보기
    tappable("#each_quest", {
      onTap: function(e, target){
        window.localStorage.setItem("selectedQuest", $(target).attr("value"));
        questSmall(target);
      }
    });


    //케이스 제출
    tappable('#submit_logbook', function(){
      selectedQuest = window.localStorage.getItem("selectedQuest");
      console.log("start")
      $("#hidden_case_number").val($("#input_case_number").val())
      $("#hidden_log_memo").val($("#textarea_log_memo").val())

      $("#quest_id").val(selectedQuest)
      console.log($("#case_number").val());
      var formData = new FormData($('#formData_logbook')[0])
      formData.append("token", user_token)

      console.log(formData.serialize)
      $.ajax(
      {
        type: "POST",
        url: host +  '/quest/record_case',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 25000,
        beforeSend: function(data){
          console.log("fire")
        },
        success: function (data) {
          if (data.error_code == 1){
            alert("성공적으로 등록되었습니다")
            go_logbook()
          }
        },
        error: function(data)
        {
            alert("등록에 실패하였습니다")
        }
      });
    });


  // move logbook
    $("#datepicker_date_logbook").change(function () {
        console.log($("#datepicker_date_logbook").val())
        selectedMajorId = window.localStorage.getItem("selectedMajorId");
        var today = new Date()
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        //function parseDate(input) {
        //  parts = input.split('/');
        //  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        //  return new Date(parts[2], parts[0]-1, parts[1]); // Note: months are 0-based
        //}
        //var day = weekday[parseDate($("#datepicker_date_logbook")).getDay()];
        //$("#datepicker_day_logbook").text(day); 
         go_logbook($("#datepicker_date_logbook").val());
      })
      .change();



  // move comment
    $("#datepicker_date_comment").change(function () {
        var selectedDate = $("#datepicker_date_comment").val()
        selectedMajorId = window.localStorage.getItem("selectedMajorId");
        var today = new Date()
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        //function parseDate(input) {
        //  parts = input.split('/');
        //  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        //  return new Date(parts[2], parts[0]-1, parts[1]); // Note: months are 0-based
        //}
        //var day = weekday[parseDate($("#datepicker_date_logbook")).getDay()];
        //$("#datepicker_day_logbook").text(day); 
        go_comment(selectedDate);
      })
      .change();



  //evaluation
    tappable('#evaluation_submit' , function(){
       var formData = new FormData($('#valuation')[0])
       formData.append("token", user_token)
         $.ajax(
         {
            type: "POST",
            url: host +  '/api/evaluation_process',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(data){
              window.location.replace('pages.html#result_modal');},
            success: function (data) {
              if (data.error_code == 1){
                alert("성공적으로 등록되었습니다")
                go_logbook()
              }
            },
            error: function(data)
            {
                alert("등록에 실패하였습니다")
            }
         });
    });

    //report_detail


    tappable("#each_report_log_box", {
      onTap: function(e, target){
        window.localStorage.setItem("selectedUserQuest", $(target).attr("value"));
        $.ajax({
          url: host +  "/quest/read_userquest" ,
          type: "POST",
          data: {
            userQuestId:$(target).attr("value")
          },
          success: function(data) {
            if (data.error_code ==1) {
              $("#div_log_memo").text(data.memo)
              $("#questlarge_title-recorded_log").text(data.large_title)
              $("#questsmall_list-recorded_log").html("")
              for (i = 0; i < data.title.length; i++) {
                $("#questsmall_list-recorded_log").append(" " +
                  "<div class = 'log_detail_body_box_each'>" +
                    "<div class = 'each_log_list_lt'>" +
                      "<div class = 'outer'>" +
                        "<div class = 'middle'>" +
                          "<div class = 'inner'>" +
                            "<div class = 'each_log_list_lt_txt '>" +
                              (parseInt(i)+1) +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class = 'each_log_list_rt'>" +
                      "<div class = 'each_log_list_rt_txt'>" +
                        data.title[i] +
                      "</div>" +
                    "</div>" +
                    "<div class = 'clear'>" +
                    "</div>" +
                  "<div class = 'by_log_by'>" +
                    "<div class = 'by_log_by_inner absolute_center'>" +
                    "</div>" +
                  "</div>" +
              "")}
              if (data.picture_url != null) {
                $("#detail_picture_box-recorded_log").removeClass("detail_picture_box-none").addClass("detail_picture_box");
                $("#detail_picture_box-recorded_log").css("background-image","url('" + host  +"/img/" + data.picture_url + "')")
              }else{
                $("#detail_picture_box-recorded_log").css("display","none")  
              }
              $("#case_number-recorded_log").text("Case # " + data.case_number);
              location.href= "pages.html#recorded_log_detail"
            } else {
              alert(data.error_msg);
            }
          }
        });
      }
    });




    //camera
    tappable("#qna_write_camera", {
      onTap: function(e, target){
        navigator.camera.getPicture(onSuccess_qna, onFail, { quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit : true,
          targetWidth: $(window).width(),
          targetHeight: $(window).width()
        });
        function onSuccess_qna(imageData) {
          var image = $("#qna_write_camera")
          image.css("background-image", "url('" + "data:image/jpeg;base64," + imageData + "')");
          image.css("background-repeat","no-repeat");
          image.css("background-position", "center center");
          image.css("background-size","100%")
          $("#image").val(imageData);
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
      }
    });

    tappable("#logbook_write_camera", {
      onTap: function(e, target){
        navigator.camera.getPicture(onSuccess_log, onFail, { quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit : true,
          targetWidth: $(window).width(),
          targetHeight: $(window).width()
        });
        function onSuccess_log(imageData) {
          var image = $("#logbook_write_camera")
          image.css("background-image", "url('" + "data:image/jpeg;base64," + imageData + "')");
          image.css("background-repeat","no-repeat");
          image.css("background-position", "center center");
          image.css("background-size","100%")
          $("#image_logbook").val(imageData);
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
      }
    });

    tappable("#modify_write_camera", {
      onTap: function(e, target){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit : true,
          targetWidth: $(window).width(),
          targetHeight: $(window).width()
        });
        function onSuccess(imageData) {
          var image = $("#modify_write_camera")
          image.css("background-image", "url('" + "data:image/jpeg;base64," + imageData + "')");
          image.css("background-repeat","no-repeat");
          image.css("background-position", "center center");
          image.css("background-size","100%")
          $("#image-modify").val(imageData);
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
      }
    });


  });
}
