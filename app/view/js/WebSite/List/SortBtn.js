const RadioBtn=document.getElementsByName("orderPage");
const SortBtn = document.getElementById("btn_sort_page");

let click=0;
SortBtn.onclick=()=>{

    click++;
    if(click%2!=0)
    {
        $(".btn-sort-page-list").css("display","block");
    }else
    {
        $(".btn-sort-page-list").css("display","none");
    }
    
}

