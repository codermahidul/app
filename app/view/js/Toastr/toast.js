function toast(text,type,close=true)
{
    
    if(!close)
    {
       // toastr.options.timeOut= 180000;
        toastr.options.timeOut= 0;
        toastr.options.extendedTimeOut= 0;
    
    }else
    {
        toastr.options.timeOut = 8000;
    }
    toastr.options.positionClass = 'toast-bottom-right';
  //  toastr.options.rtl = true;
    if(type==="error")
    {
        toastr.error(text);
    }
    if(type==="success")
    {
        toastr.success(text);
    }
    if(type==="warning")
    {
        toastr.warning(text);
    }

   
}