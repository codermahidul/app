import { SwalRemoveFetch } from "../functions/SwalDelete.js";

const btnsFollow=document.getElementsByClassName("follow-interest");

for (let i = 0; i < btnsFollow.length; i++) {

    btnsFollow[i].onclick = (e) => {

      Follow(e)
    };
  };

  const RefreshPage=()=>{
      window.location.reload()
  }

  const Follow=(e)=>{
    let id=e.currentTarget.dataset.id;
    let param={
        user_responder:id,
    }
    
    SwalRemoveFetch("useraction/requestfollow"
        , param
        , RefreshPage
        , "Are you sure of your request"
        , ""
        , "info"
        , "No request sent"
        , ""
        , false
        ,"Your request has been sent"
    );
  }

  
  $('.multiple-items-small').slick({
    dots:true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });

  $('.multiple-items').slick({
    dots:true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });