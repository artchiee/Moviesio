
var typingtime;
var doneTypingInterval = 5000  // timer in ms (5000=5s)
var $query_input = $("#key_search")

$(document).ready(function () {

  // on keyup start the timer

  $query_input.on('keyup', function() {
    query_input = $(this).val();
    clearTimeout(typingtime);
    
    if (query_input) {
      typingtime = setTimeout(doneTyping, doneTypingInterval);

    }
  });
  


  function doneTyping() {
    $.ajax({
      type: "POST",
      url: "/fetch",
      data: {
        query_search: $("#key_search").val() // query_search can be any var is the var tha ajax send to flask
      },
      success: function (data) {

        // Json.strigfy returns the actual content json respons 
        // TODO  : for loop to get all data 
        $.each(data, function(value) {
          $("#output").text(JSON.stringify)(
            '<ul> <li> <p> "" ' 
            + value['results']['title'] +
             '</p></li></ul>');
          
        });
       
      },
      error : function(data,xhr) {
        $("#output").text(JSON.stringify(data.error));
        console.log('got data error', data.error);
      }
    });
  }
});


          //   // itterate through the json response
          //   $.each(data.results, function(title) {
          //     console.log('titles got ',  title)
          //   })

          //   // $("#output").html(response);
          //   // console.log('Data executed'),

          //     xhr.status,
          //     xhr.responseText
          // },
          // error: function (xhr, status) { 
          //   xhr.status,
          //   xhr.responseText
          // }

// *****************************************************


// define a variable spinner 
// properties can be customized 

// import { Spinner } from "./spinner";

// var spin = {
//     lines: 9,    // The number of lines in the spinner
//     length: 10,  // The length of each line
//     width: 3,    // The line thickness
//     radius: 6,   // The radius of the inner circle
//     corners: 1,  // Corner roundness (0..1)
//     rotate: 58,  // The rotation offset
//     direction: 1, // 1: clockwise, -1: counterclockwise
//     color: '#000000 ', // #rgb or #rrggbb or array of colors
//     speed: 0.9,  // Rounds per second
//     trail: 100,  // Afterglow percentage
//     shadow: false, // Whether to render a shadow
//     hwaccel: false, // Whether to use hardware acceleration
//     className: 'spinner', // The CSS class to assign to the spinner
//     zIndex: 99,  // the modals have zIndex 100
//     top: 'auto', // Top position relative to parent
//     left: '50%'  // Left position relative to parent 
// }


// // function to be called once user strart typing in search form 
// function dsiplay_results() { 
//     var sp = document.getElementById('spinme');
//     sp.innerHTML = "<td colspan='5'>Updating table</td>"; 

//     var spinner = new Spinner(spin).spin(sp);
//     var search = document.getElementById('key_search').value;
//     doc = {'search_term' : search};

//     $ajax({
//         url : $SCRIPT_ROOT + '/fetch', // flask url 
//         type  : "POST",
//         async: true,
//         cache: false,
//         dataType: 'json',
//         contentType: "application/json; charset=utf-8",

//     }
//     )
// }
