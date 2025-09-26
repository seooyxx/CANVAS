window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    // Force single slide display on all screen sizes
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Initialize carousel
    var carousels = bulmaCarousel.attach('.carousel', options);
    
    // Force refresh to ensure settings apply
    setTimeout(function() {
        for(var i = 0; i < carousels.length; i++) {
            if (carousels[i] && carousels[i].refresh) {
                carousels[i].refresh();
            }
        }
    }, 100);

    // Only initialize slider if elements exist
    if (document.querySelector('#interpolation-slider')) {
        preloadInterpolationImages();
        
        $('#interpolation-slider').on('input', function(event) {
            setInterpolationImage(this.value);
        });
        setInterpolationImage(0);
        $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
        
        // Only attach bulmaSlider if it exists and elements are present
        if (typeof bulmaSlider !== 'undefined') {
            try {
                bulmaSlider.attach();
            } catch (e) {
                console.log('Bulma slider not available or not needed');
            }
        }
    }

})
