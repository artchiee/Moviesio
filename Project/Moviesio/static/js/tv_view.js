// change trailer number based on  select option

function Changevalue() {
  var select = document.getElementById("changeValue");
  $("#tv_trailer").text(select.value + " " + "Trailer");
}

window.addEventListener("load", (event) => {
  // default(onload get the first season option)
  function default_trialer() {
    var select = document.getElementById("changeValue");
    $("#tv_trailer").text(select.value + " " + "Trailer");
  }

  return default_trialer();
});
