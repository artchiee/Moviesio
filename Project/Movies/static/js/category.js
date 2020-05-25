// // duynamique rendering category results 
// var genre_return = $('#genre_return');

// $.ajax({
//     type: 'POST',
//     url: "/catg",
//     data: {
//         final_genre : $('#genre_id'),
//     },
//     dataType: 'json',
//     success: function (data) {
//         var genre_res = data.final_genre.results;

//         if (genre_res) {
//             var genre_clean = JSON.parse(JSON.stringify(genre_res));
//             console.log('data res : ', genre_clean);
//         } else {
//             console.log(genre_clean.error);
//         }

//         // once genre clicked fire up ajax call 
//         var genre_output = '';
        
//         for (var i in genre_clean) {
//             genre_output +=
//                 "<i class='fas fa-star text-black'></i>" +
//                 "<i class='fas fa-star text-black'></i>" +
//                 "<i class='fas fa-star text-black'></i>" +
//                 "<a href= '#' >" +
//                 "<img src='https://image.tmdb.org/t/p/original" + genre_clean[i].poster_path + "'" + ">" +
//                 "</a>"
//         }

//         genre_output += "";
//         genre_return.htmt(genre_output);
//     },
//     error: function (data) {
//         console.log('error', data.error)
//     }
// })

function genre_results() {
    var $genre_clicked  = document.getElementById('genre_id');
    // genre clicked 
    if ($genre_clicked) {
        var id =  $(this).attr('id') ;  // value of id clicked
        console.log('genre clicked : ' , id) ;
    }
    else{
        console.log('data missing !!!') ; 
    }   
    var url_set = "{{ url_for('catg', 'test_data' ) }}"  ; 
    //var ajax_call = url_set.replace('/test_data/' , id ) ;
    
    var ajax_call  = $.ajax(url_set.replace('/test_data/', String(id))
    .done(function(data) {
        console.log('data returned : ' , data )
    })
    );    
    

}