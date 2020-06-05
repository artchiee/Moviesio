// Horizontal genre category scroll

$("#arrowright").click(function () {
  event.preventDefault();
  $("#content").animate(
    {
      scrollLeft: "+=300px",
    },
    "slow"
  );
});

$("#arrowleft").click(function () {
  event.preventDefault();
  $("#content").animate(
    {
      scrollLeft: "-=300px",
    },
    "slow" // control scroll speed(slow/fast)
  );
});
