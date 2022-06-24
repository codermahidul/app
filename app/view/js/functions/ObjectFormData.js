export default function getObjFormData(id,setNull=false){
    let obj = {};
    let formData = $("#"+id).serializeArray();
    
    let arrays=[];
    for (let i = 0; i < formData.length; i++) {
      
      if(setNull)
      {
        if(formData[i].value==="")
        formData[i].value="null";
      }
      let data={ [formData[i].name]: formData[i].value };
     
      
  

      arrays.forEach((d,index) => {
        
        let values= Object.entries(data);
        let KeyVal= Object.entries(d);

        if(values[0][0]===KeyVal[0][0])
        {
          let newVal=KeyVal[0][1]+","+values[0][1];
          data[KeyVal[0][0]]=newVal;
          arrays.splice(index, 1);
   
        }
      });
      arrays.push(data);
      obj = { ...obj,...data };
    }
    return obj;
}