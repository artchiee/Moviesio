// duynamique category results 
var ;

$.ajax({
    type: 'POST',
    url: "/catg",
    data: {
        genre_clicked = $('#button_{{genre_id }}').val(),
    },
    dataType: 'json',
    success: function (data) {
        var genre_res = data.genre_clicked.results
        if (genre_res) {
            var genre_clean = JSON.parse(JSON.stringify(genre_res))
            console.log('data res : ', genre_clean)
        } else {
            console.log(genre_clean.error)
        }

    },
    error: function (data) {
        console.log('error', data.error)
    }
})