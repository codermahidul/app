export default function checkValue(element) {
    if(element.value==="")
    {
        toast(element.name+" is empty", "error");
        return false;
    }
    return true;
}

export const CheckCaptcha=()=>{
    let response = grecaptcha.getResponse();
	  if(response.length == 0){toast("Some error in verifying g-recaptcha", "error");return false;}
     return true;

}
