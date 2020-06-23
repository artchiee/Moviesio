// Get the button id clicked and send it to
// Flask

function get_btn_clicked(clicked_id) {
  //id_clicked = clicked_id;
  console.log("Button clicked is : ", clicked_id);

  $.post("/", {
    // send clicked id to flask to process
    selected: JSON.stringify(clicked_id),
  });
}
