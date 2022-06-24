import   '../Slick.js';
const CopyBtn = document.getElementById("copy_url");



const copyToClipboard = (textToCopy) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}


if(CopyBtn !==null)
{
  CopyBtn.onclick=()=>{
    let copyText = CopyBtn.dataset.url;


  
    /* Copy the text inside the text field */
    //navigator.clipboard.writeText(copyText);
    copyToClipboard(copyText)
    .then(() => toast("copied to clipboard", "warning"))
    
    
  }
}