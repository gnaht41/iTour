$(document).ready(function(){
    $('.tour-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: false,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-caret-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa-solid fa-caret-right' aria-hidden='true'></i></button>",
        responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3
                }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                draggable: true,
                infinite: false,
                dots: true
                
              }
            },

          ]
        
    });
  });
          