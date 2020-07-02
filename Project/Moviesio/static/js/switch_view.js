function get_btn_clicked(clicked_id) {
  var selected = clicked_id;
  console.log("Button clicked is : ", selected);

  // Send button clicked to flask

  var Switch_to = $.ajax({
    url: "/",
    type: "POST",
    data: {
      choice_clicked: selected,
    },
    dataType: "json",
    success: function (data) {
      console.log("success");

      var trend_res = data.get_trends.results;
      var popular_res = data.get_pops.results;

      var trend_parsed = JSON.parse(JSON.stringify(trend_res));
      var pop_parsed = JSON.parse(JSON.stringify(popular_res));

      // html div to replace
      var carousel_output = $("#switch_backdrop");
      var cards_output = $("#switch_posters");

      // switching trending carousel
      var trend_output =
        "<img class='d-block w-100' alt='poster' src='https://image.tmdb.org/t/p/original" +
        trend_parsed[0].backdrop_path +
        "'" +
        ">";

      // switching card view
      var pop_output;
      for (var i in pop_parsed) {
        "<img src='https://image.tmdb.org/t/p/original" +
          pop_parsed[i].poster_path +
          "'" +
          ">";
      }

      carousel_output.html(trend_output);
      cards_output.html(pop_output);

      // delete later : check if return is working
      console.log(
        "trend res : ",
        "<img src='https://image.tmdb.org/t/p/w92" +
          trend_parsed[0].backdrop_path +
          "'",

        console.log(
          "pop res  : ",
          "<img src='https://image.tmdb.org/t/p/w92" +
            pop_parsed[1].poster_path +
            "'"
        )
      );
    },

    // throw error if something goes wrong
    error: function (data) {
      console.log(data.error);
    },
  });
  return Switch_to;
}

//
