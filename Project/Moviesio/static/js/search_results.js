var typingtime;
var doneTypingInterval = 5000; // timer in ms (5000=5s)
var $query_input = $("#key_search");
var output = $("#search_output");

$(document).ready(function () {
  // on keyup start the timer

  $query_input.on("keyup", function () {
    query_input = $(this).val();
    clearTimeout(typingtime);

    // waiting executed
    if (query_input) {
      typingtime = setTimeout(doneTyping, doneTypingInterval);
    }
  });

  function doneTyping() {
    $.ajax({
      type: "POST",
      url: "/fetch",
      data: {
        query_search: $("#key_search").val(), // query_search is the var tha ajax send to flask
      },
      dataType: "json",
      success: function (data, status) {
        console.log("sucess", status.success);
        // Json.strigfy returns the actual content json respons
        var dt_response = data.query_search.results;
        var js_stringfy = JSON.parse(JSON.stringify(dt_response));

        // TODO: delete later
        if (typeof (data.query_search === "object")) {
          console.log("type of this data is :object ", js_stringfy);
        } else {
          console.log("this data is not an object ");
        }

        //FIXME:  search limit
        var html_output = "<ul>";
        for (var i in js_stringfy) {
          html_output +=
            "<li>" +
            "<a href='#' class='block hover:bg-gray-800'>" +
            "<img class='w-8' alt='poster' src='https://image.tmdb.org/t/p/w92" +
            js_stringfy[i].poster_path +
            "'" +
            ">" +
            "<span class='ml-4 pb-4'>" +
            js_stringfy[i].title +
            "</span>" +
            "</a>" +
            "</li>";
        }
        html_output += "</ul>";
        output.html(html_output);

        console.log(
          "posters path : ",
          "<img src='https://image.tmdb.org/t/p/w92" +
            js_stringfy[1].poster_path +
            ""
        );
      },

      error: function (data, xhr) {
        $("#output").text(JSON.stringify(data.error));
        console.log("got data error", data.error, xhr.error);
      },
    });
  }
});
