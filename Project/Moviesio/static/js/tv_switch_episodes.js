$(".changeValue").change(function () {
  var select = $(this).val();

  // change trailer number based on  select option
  // render season name in button on select change

  $("#tv_trailer").text(select + " " + "Trailer");

  var poster_switch = $("#poster_switch");
  var get_episodes = $("#getepis");

  console.log("season reqe : ", select);

  // (get id(int) == post to flask) of selected option == value
  var id = $(this).children(":selected").attr("id");
  console.log("season id : ", id);

  $.ajax({
    url: "/Popular/tv_detail/",
    type: "POST",
    data: {
      season_selected: id,
    },
    dataType: "json",
    success: function (data) {
      //console.log("success returned : ", data

      // This response have nested data
      var global_access = JSON.parse(JSON.stringify(data.resp));
      var check_season = global_access.season_number;

      // flask json return must equal id selected
      if (check_season == id) {
        // poster change
        poster_switch.html(
          "<img alt='poster' src='https://image.tmdb.org/t/p/original" +
            global_access.poster_path +
            "'" +
            ">"
        );

        // var empty_content = $(".override").empty();
        // if (empty_content) {
        //   console.log("true");
        // } else {
        //   console.log("false");
        // }

        // seasons episodes
        var output_epis = "";
        var fetch_epis = global_access.episodes;
        for (var i in fetch_epis) {
          output_epis +=
            "<div class='col-3'>" +
            "<div id='posterepis' class='card card-block'>" +
            "<img alt='poster' src='https://image.tmdb.org/t/p/original" +
            fetch_epis[i].still_path +
            "'" +
            ">" +
            "<div class='seasoninfo mt-8'>" +
            "<p class='overviews'>" +
            fetch_epis[i].overview +
            "</p>" +
            "<h3>" +
            "Episode:" +
            fetch_epis[i].episode_number +
            "</h3>" +
            "<span><i class='fa fa-star pr-3'></i>" +
            fetch_epis[i].vote_average +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>";
        }
        // output episodes
        get_episodes.html(output_epis);

        // just to check if above(if is working)
      } else {
        console.log("error occured !!");
      }
    },
    error: function (data) {
      console.log("error", data.error);
    },
  });
});

// window.addEventListener("load", (event) => {
//   function Default_data() {
//     var select = document.getElementsByClassName("changeValue")[0];
//     $("#tv_trailer").text(select.value + " " + "Trailer");
//     //$("#tvname").text()
//   }

//   return Default_data();
// });
