function get_btn_clicked(clicked_id) {
  var selected = clicked_id;
  var pop_cards = $("#cards_switching");
  //var trend_view = $("#switch_backdrop");

  // verify which btn clicked(tv | movie)
  console.log("Button clicked is : ", selected);

  var Switch_to = $.ajax({
    // url append --> (btn clicked to indicate which view requested)
    url: "/",
    type: "POST",
    data: {
      choice_clicked: selected,
    },
    dataType: "json",
    success: function (data) {
      console.log("success");

      // var trend_res = data.get_trends.results;
      var popular_res = data.get_pops.results;

      //var trend_parsed = JSON.parse(JSON.stringify(trend_res));
      var pop_parsed = JSON.parse(JSON.stringify(popular_res));

      // FIXME: switching trending carousel
      // var trend_output = "";
      // trend_output +=
      //   "<img class='d-block w-100' alt='poster' src='https://image.tmdb.org/t/p/original" +
      //   trend_parsed[0].backdrop_path +
      //   "'>";

      // Empty the div first and override old content
      //switching popular card view
      var div_override = $("#cards_switching").children().empty();
      if (div_override) {
        console.log("true empty");

        var pop_output = "";
        for (var i in pop_parsed) {
          pop_output +=
            "<div class='mt-4'>" +
            "<img src='https://image.tmdb.org/t/p/original" +
            pop_parsed[i].poster_path +
            "'>" +
            "</div>";
        }
      } else {
        console.log("not empty");
      }

      // //trend_view.html(trend_output);
      pop_cards.html(pop_output);

      // delete later : check if data return is working
      // console.log(
      //   "trend res : ",
      //   "<img src='https://image.tmdb.org/t/p/w92" +
      //     trend_parsed[0].backdrop_path +
      //     "'",

      //   console.log(
      //     "pop res  : ",
      //     "<img src='https://image.tmdb.org/t/p/w92" +
      //       pop_parsed[1].poster_path +
      //       "'"
      //   )
    },

    // throw error if something goes wrong
    error: function (data, status) {
      console.log(data.errorn, status);
    },
  });
  return Switch_to;
}
