var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
  showSlides(slideIndex);
  myTimer = setInterval(function () {
    currentSlide(1);
  }, 4000);
  slideshowContainer = document.getElementsByClassName("carousel-inner")[0];

  slideshowContainer.addEventListener("mouseenter", pause);
  slideshowContainer.addEventListener("mouseleave", resume);
});

// Run slides automaticlly
function currentSlide(n) {
  clearInterval(myTimer);
  // myTimer = setInterval(function () {
  //   plusSlides(n + 1);
  // }, 4000);

  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  // set slides/captions to block or none while sliding
  var slides = document.getElementsByClassName("overlay");
  var captions = document.getElementsByClassName("carousel-caption");
  var dots = document.getElementsByClassName("indicator");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    captions[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  captions[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
};

resume = () => {
  clearInterval(myTimer);
  myTimer = setInterval(function () {
    currentSlide(slideIndex);
  }, 4000);
};
