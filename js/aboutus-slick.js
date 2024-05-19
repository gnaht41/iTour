$('.profile-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
  responsive:[
    {
      breakpoint: 576,
      settings: {
        arrows: false,
        dots: true,
      }
    }
  ]
});