$('.slick').slick({
  dots: false,
  infinite: true,
  speed: 300,
  arrows: false,
  slidesToShow: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000,
});

$('.slick-one').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});

// $('.multiple-items').slick({
//   dots:false,
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   centerMode: true,
//   centerPadding: '30px',

// });

const SetSlick = (numbers) => {
  $('.multiple-items').slick({
    dots: false,
    infinite: true,
    slidesToShow: numbers,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '40px',

  });
}



const CreateSlick = () => {
  let width = $(window).width();
  if (width >= '1500') {
    SetSlick(3);
  }
  if (width >= '1000' && width < '1500') {
    SetSlick(3);
  }

  if (width >= '800' && width < '1000') {
    SetSlick(2);
  }

  if (width >= '600' && width < '800') {
    SetSlick(2);
  }

  if (width < '600' ) {
    SetSlick(1);
  }

}

CreateSlick();

// $('.trendsell').owlCarousel({
//   loop:true,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:2
//       },
//       600:{
//           items:3
//       },
//       1000:{
//           items:4
//       }
//   }
// });