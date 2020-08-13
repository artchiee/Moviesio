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
      var div_override = $("#cards_switching").children().empty();
      if (div_override) {
        console.log("true : div empty");
      } else {
        console.log("not empty");
        alert("Timeout; Please try again");
      }

      //switching popular card view
      var obj_name = "";
      var obj_air_date = "";

      var pop_output = "";
      for (var i in pop_parsed) {
        //change js objs between(tv|movie) view
        if (selected == "tv") {
          obj_name = pop_parsed[i].name;
          obj_air_date = pop_parsed[i].first_air_date;
        } else {
          obj_name = pop_parsed[i].title;
          obj_air_date = pop_parsed[i].release_date;
        }

        pop_output +=
          "<div class='mt-4'>" +
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          // TODO:link to detail page
          "<a class='redirect_to_detail'" +
          "'>" +
          "<img id='posters class='_posters' src='https://image.tmdb.org/t/p/original" +
          pop_parsed[i].poster_path +
          "'>" +
          "</a>" +
          "<div class='mt-2'>" +
          "<h3 class='m_link text-lg mt-2'>" +
          obj_name +
          "</h3>" +
          "<div class='flex items-center text-gray-700'>" +
          "<span>" +
          obj_air_date +
          "</span>" +
          "<span> || </span>" +
          "</div>" +
          "</div>" +
          "</div>";
      }

      //trend_view.html(trend_output);
      pop_cards.html(pop_output);
    },

    error: function (data, status) {
      console.log(data.error, status);
    },
  });
  return Switch_to;
}
