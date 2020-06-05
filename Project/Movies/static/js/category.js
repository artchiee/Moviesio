// duynamique rendering genre category results
// TODO: Render category view (ajax)
function update_category(clicked_id) {
  console.log("button id with this : " + clicked_id);

  $.ajax({
    type: "GET",
    data: {
      data: clicked_id,
    },
    url: "/catg/",
    dataType: "json",

    success: function (data) {
      // log in the data
      var genre_results = data;

      console.log("DAta got  : ", genre_results);
      windows.location.href =
        "{{ url_for('/catg', genre_results=genre_results) }}";

      console.log("*" * 20);

      //var genre_call = data.genre_clicked.results;
      var json_output = JSON.parse(JSON.stringify(genre_results));

      var genre_output = "";
      var genre_clean = data;
      var genre_return = $("#genre_return");

      for (var i in json_output) {
        genre_output +=
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          "<a href= '#' >" +
          "<img src='https://image.tmdb.org/t/p/original" +
          json_output[i].poster_path +
          "'" +
          ">" +
          "</a>";
      }

      genre_output += "";
      genre_return.htmt(genre_output);
    },
    error: function (data, status) {
      console.log("GOT data error : ", data.error, "\n status", data.status);
    },
  });
}
