








export const  tokenGenerator=()=>{
  const len = 16;
  const arr = "123456789abcdefghijklmnopqrstuvwxyz";
  var ans = "";
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

export const convertImage = async (file) => {
    let newURL = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

    return newURL;
  };


export   const crossEvent=()=>{
    let imagId=document.getElementById("imagefile"); 
    const preview = document.querySelector("img");
    preview.src="";
    imagId.style.visibility='visible'  
    
  }

export function amountFormatter(amount){

    const numberFormat = (value) =>
       new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR'
       }).format(value);
 
       let finalAmount = numberFormat(amount) 
       console.log(finalAmount, "final Amount");
       return finalAmount;
      
 }


    
    
  export const saveToCookie = (COOKIE_NAME,data) => {
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(data)}`
  }

  