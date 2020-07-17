// change trailer number based on  select option
$(".changeValue").change(function () {
  var select = $(this).val();
  // render season name in button on select change
  $("#tv_trailer").text(select + " " + "Trailer");

  var poster_switch = $("#poster_switch");
  var out_date = $("#out_date");
  var count_eps = $("#episodes");

  console.log("season reqe : ", select);

  // (get id(int) == post to flask) of selected option == value
  var id = $(this).children(":selected").attr("id");
  console.log("season id : ", id);

  var season_Switch = $.ajax({
    url: "/tv/",
    type: "POST",
    data: {
      season_selected: id,
    },
    dataType: "json",
    success: function (data) {
      //console.log("success returned : ", data);

      // parse / stringfy json flask data
      seas_res = JSON.parse(JSON.stringify(data.season_info));
      tvinfo = JSON.parse(JSON.stringify(data.tv_info));

      //console.log("tv info ", tvinfo);

      // check if id above == season(id) in json data
      var all_seasosn = seas_res.seasons;
      for (var check_id in all_seasosn) {
        var get_ses_data = all_seasosn[check_id];

        // flask json return must equal id selected
        if (get_ses_data.season_number == id) {
          //console.log("success", get_ses_data);

          // poster change
          poster_switch.html(
            "<img alt='poster' src='https://image.tmdb.org/t/p/original" +
              get_ses_data.poster_path +
              "'" +
              ">"
          );

          //out date
          out_date.html("<h2>" + get_ses_data.air_date + "</h2>");
          // count episodes for each season
          count_eps.html(
            "<mute>" + "Episods : " + get_ses_data.episode_count + "</mute>"
          );

          // getting other data
        }
      }
    },

    error: function (data) {
      console.log("error", data.error);
    },
  });
});

window.addEventListener("load", (event) => {
  function Default_data() {
    var select = document.getElementsByClassName("changeValue")[0];
    $("#tv_trailer").text(select.value + " " + "Trailer");
    //$("#tvname").text()
  }

  return Default_data();
});
