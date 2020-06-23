// function update_category(clicked_id) {
//   user_clicks = clicked_id;
//   console.log("button id clicked : " + user_clicks);
// }
// function get_genre(id) {
//   user_choice = id;
// }

// FIXME :
function get_genre() {
  var url_args = document.getElementById("user_choice");
  console.log("data pressed : ", url_args.value);
  var url_data = "{{ url_for('/catg' , 'dummy_data') }}";

  var clean_url = $.ajax(url_data.replace(/dummy_data/, url_args)).done(
    function (data) {
      console.info("done");
    }.fail(function (error) {
      console.log("errro :" + error);
    })
  );
}
