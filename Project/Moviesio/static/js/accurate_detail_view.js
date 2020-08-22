function getID(imageID) {
  var id_requested = imageID;
  // tracking which id clicked from home page(startup)
  var choice_typ = selected.id;

  console.log("type : ", choice_typ, ";", "id", id_requested);

  // getting which card type clicked(tv | movie) card
  // Each type has it's own template but will be handeled
  // Within one function

  //changing type method because tv view has post inside it
  if (choice_typ == "tv") {
    location_to_go = "/Popular/tv_detail/";
  } else {
    location_to_go = "/Popular/movie_detail/";
  }
  $.ajax({
    //TODO: url append --> (btn clicked to indicate which view requested)
    url: "/check_detail/",
    type: "POST",
    data: {
      id_selected: id_requested,
      type_requested: choice_typ,
    },
    success: function () {
      //Manage redirect to ==> (Flask route)
      window.location.href = location_to_go;
    },
  });
}
