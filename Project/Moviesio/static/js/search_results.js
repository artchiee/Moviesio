var typingtime;
var doneTypingInterval = 5000; // timer in ms (5000=5s)
var $query_input = $("#key_search");
var output = $("#search_output");
var $loader = $("#loading");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

$(document).ready(function () {
  // hide the spin on load
  $loader.hide();

  $query_input.on("keyup", function () {
    query_input = $(this).val();
    clearTimeout(typingtime);

    // waiting executed + display loader
    if (query_input) {
      typingtime = setTimeout(doneTyping, doneTypingInterval);
      sleep(2050).then(() => {
        $loader.show();
      });
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
            "<a class='block hover:bg-gray-800'>" +
            "<img class='w-8' alt='poster' src='https://image.tmdb.org/t/p/w92" +
            js_stringfy[i].poster_path +
            "'" +
            "id='" +
            js_stringfy[i].id +
            "'" +
            "onclick='getID(this.id)'" +
            "'>" +
            "<span class='ml-4 pb-4'>" +
            js_stringfy[i].title +
            "</span>" +
            "</a>" +
            "</li>";
        }
        html_output += "</ul>";
        output.html(html_output);
        $loader.hide();
      },

      error: function (data) {
        $loader.hide();
        $("#output").text(JSON.stringify(data.error));
        console.log("got data error", data.error);
      },
    });
  }
});
