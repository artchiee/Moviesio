//  // Globally scoped object
var selected = {};
function get_btn_clicked(clicked_id) {
  selected.id = clicked_id;
  var pop_cards = $("#cards_switching");
  //var _slides = $("#override");

  //var trend_slides = $("#switch_backdrop");
  // var dateOut = $("#date_out");
  // var caption = $("#wrapper");

  // verify which btn clicked(tv | movie)
  console.log("Button clicked is : ", selected.id);

  var Switch_to = $.ajax({
    // url append --> (btn clicked to indicate which view requested)
    url: "/",
    type: "POST",
    data: {
      choice_clicked: selected.id,
    },
    dataType: "json",
    success: function (data) {
      console.log("success");

      var trend_res = JSON.parse(JSON.stringify(data.get_trends.results));
      var popular_res = JSON.parse(JSON.stringify(data.get_pops.results));

      // //TODO: Empty slides div
      // for (var i = 0; i <= 3; i++) {
      //   var trend_output = "";
      //   if (selected == "tv") {
      //     trend_output +=
      //       "<img id='slides' class='d-block w-100' src='https://image.tmdb.org/t/p/original" +
      //       trend_res[i].backdrop_path +
      //       "'>";
      //     //console.log(img.src);
      //   } else {
      //     console.log(error);
      //   }
      // }

      //switching popular card view
      var obj_name = "";
      var obj_air_date = "";

      var pop_output = "";
      pop_cards.children().empty();
      for (var i in popular_res) {
        //change js objs between(tv|movie) view
        if (selected == "tv") {
          obj_name = popular_res[i].name;
          obj_air_date = popular_res[i].first_air_date;
        } else {
          obj_name = popular_res[i].title;
          obj_air_date = popular_res[i].release_date;
        }

        pop_output +=
          "<div class='mt-4'>" +
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          "<i class='fas fa-star text-black'></i>" +
          "<a>" +
          "<img src='https://image.tmdb.org/t/p/original" +
          popular_res[i].poster_path +
          "'" +
          "id='" +
          popular_res[i].id +
          "'" +
          "onclick='getID(this.id)'" +
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
      pop_cards.html(pop_output);
    },

    error: function (data) {
      console.log(data.error);
    },
  });
  return Switch_to;
}
