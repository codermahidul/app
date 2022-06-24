export const  numberFormat=(x) =>{

    if(x ===undefined || x==='' || x===null)
    return '';
    
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}