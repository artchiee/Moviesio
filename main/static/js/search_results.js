
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
