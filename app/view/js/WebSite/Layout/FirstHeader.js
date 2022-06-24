window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

    $("#hSmall").css("display","");
    $("#hBig").css("display","none");
  } else {

    $("#hSmall").css("display","none");
    $("#hBig").css("display","");
  }
}