$(".changeValue").change(function () {
  var select = $(this).val();

  // change trailer number based on  select option
  // render season name in button on select change

  $("#tv_trailer").text(select + " " + "Trailer");

  var poster_switch = $("#poster_switch");
  var out_date = $("#out_date");
  var count_eps = $("#episodes");
  var get_episodes = $("#getepis");
  var get_similar = $("#getsimilar");
  var get_teasers = $("#getTeas");

  console.log("season reqe : ", select);

  // (get id(int) == post to flask) of selected option == value
  var id = $(this).children(":selected").attr("id");
  console.log("season id : ", id);

  $.ajax({
    url: "/tv/",
    type: "POST",
    data: {
      season_selected: id,
    },
    dataType: "json",
    success: function (data) {
      //console.log("success returned : ", data);

      // parse / stringfy json flask data
      var seas_res = JSON.parse(JSON.stringify(data.season_info));
      var tvinfo = JSON.parse(JSON.stringify(data.tv_epis_info));

      // sinc we have appended multiple response,you need to specify wich dic to get
      var sim_shows = JSON.parse(
        JSON.stringify(data.compact_dt.similar.results)
      );
      var get_trailers = JSON.parse(
        JSON.stringify(data.compact_dt.videos.results)
      );
      //console.log("sim", sim_shows);

      // check if id above == season(id) in flask json data
      var all_seasosn = seas_res.seasons;
      var epsds_data = tvinfo.episodes;
      for (var check_id in all_seasosn) {
        for (check_id in epsds_data) {
          var get_epis_dt = epsds_data[check_id];

          var get_ses_data = all_seasosn[check_id];

          // flask json return must equal id selected
          if (
            (get_ses_data.season_number == id) &
            (get_epis_dt.season_number == id)
          ) {
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

            // seasons episodes
            var output_epis = "";
            for (var i in epsds_data) {
              output_epis +=
                "<div class='col-3'>" +
                "<div id='posterepis' class='card card-block'>" +
                "<img alt='poster' src='https://image.tmdb.org/t/p/original" +
                epsds_data[i].still_path +
                "'" +
                ">" +
                "<div class='seasoninfo mt-8'>" +
                "<h2 class=''> Seasons Number </h2>" +
                "<h3> Episods Number </h3>" +
                "<span><i class='fa fa-star pr-3'></i>9</span>" +
                "</div>" +
                "</div>" +
                "</div>";
            }

            // Similar tv shows
            var output_simi = "";
            for (var i in sim_shows) {
              output_simi +=
                "<div class='col-3'>" +
                "<div id='postersim' class='card card-block'>" +
                "<div id='similartv'>" +
                "<img alt='poster' src='https://image.tmdb.org/t/p/original" +
                sim_shows[i].poster_path +
                "'" +
                ">" +
                "<div class='centered text-white'>" +
                "<h2> Title Name tttt </h2>" +
                "<h3> Get Seasons </h3>" +
                "<p> Get Rating </p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            }

            // Trailer /Teasers
            var output_teas = "";
            for (var i in get_trailers) {
              output_teas +=
                "<div class='col-4'>" +
                "<div class='card card-block'>" +
                "<div class='relative'>" +
                "<a href='https://www.youtube.com/watch?v=" +
                get_trailers[i].key +
                "'>" +
                "<img src='{{ url_for('static', filename = 'images/tv.jpg') }}" +
                "'>" +
                "</a>" +
                "</div>" +
                "<div class='teaserinfo flex justify-between'>" +
                "<div>" +
                "<h2>" +
                get_trailers[i].name +
                "<br>" +
                get_trailers[i].type +
                "</h2>" +
                "</div>" +
                "<i class='fa fa-play-circle mx-6 my-3'></i>" +
                "</div>" +
                "</div>" +
                "</div>";
            }

            // output episodes
            get_episodes.html(output_epis);
            // similar
            get_similar.html(output_simi);
            // Trailers/Teas
            get_teasers.html(output_teas);
          }

          // just to check if above(if is working)
          else {
            console.log("error occured !!");
          }
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
