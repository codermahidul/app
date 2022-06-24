
await import ("./Slick.js?v="+Date.now());

const CopyBtn=document.getElementById("copy_url");




if(CopyBtn !==null)
{
  CopyBtn.onclick=()=>{
    let copyText = CopyBtn.dataset.url;


  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
    
    toast("Copied the text: " + copyText, "warning");
  }
}