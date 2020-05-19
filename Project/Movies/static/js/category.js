// duynamique rendering category results 
var genre_return = $('#genre_return');

$.ajax({
    type: 'POST',
    url: "/catg",
    data: {
        genre_clicked = $('#button_{{genre_id }}').val(),
    },
    dataType: 'json',
    success: function (data) {
        var genre_res = data.genre_clicked.results;

        if (genre_res) {
            var genre_clean = JSON.parse(JSON.stringify(genre_res));
            console.log('data res : ', genre_clean);
        } else {
            console.log(genre_clean.error);
        }

        // once genre clicked fire up ajax call 
        var genre_output = '';
        
        for (var i in genre_clean) {
            genre_output +=
                "<i class='fas fa-star text-black'></i>" +
                "<i class='fas fa-star text-black'></i>" +
                "<i class='fas fa-star text-black'></i>" +
                "<a href= '#' >" +
                "<img src='https://image.tmdb.org/t/p/original" + genre_clean[i].poster_path + "'" + ">" +
                "</a>"
        }

        genre_output += "";
        genre_return.htmt(genre_output);
    },
    error: function (data) {
        console.log('error', data.error)
    }
})