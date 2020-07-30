// Horizontal scroll on Specific div element

jQuery(function ($) {
  $.fn.hScroll = function (amount) {
    amount = amount || 120;
    $(this).bind("DOMMouseScroll mousewheel", function (event) {
      var oEvent = event.originalEvent,
        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
        position = $(this).scrollLeft();
      position += direction > 0 ? -amount : amount;
      $(this).scrollLeft(position);
      event.preventDefault();
    });
  };
});

//exec ; pass the div element and amount to scroll
$(document).ready(function () {
  $("#epis_cards").hScroll(60); // You can pass (optionally) scrolling amount
});

$(document).ready(function () {
  $("#sim_cards").hScroll(60); // You can pass (optionally) scrolling amount
});
