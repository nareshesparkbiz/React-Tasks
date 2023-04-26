import React, { useState } from "react";
import "./../css/Form.css";
export const Form = () => {
  var date = new Date();
  var year = date.getFullYear();

  const values = {
     transactionDate: "" ,
     monthYear: "" ,
    transactionType: "" ,
     from: "" ,
     to: "" ,
    amount: 0 ,
     receipt: "" ,
    notes: "" ,
  }

  

  const formError1 = {
    transactionDate: false,
    monthYear: false,
    transactionType: false,
    from: false,
    to: false,
    amount: false,
    receipt: false,
    notes: false,
  };

//   const [amount, setAmount] = useState(0)
  
  const [formValues, setformValues] = useState(values);
  const [test, setTest] = useState(formError1);

  const monthYear = [
    "Jan ",
    "Feb ",
    "Mar ",
    "Apr ",
    "May ",
    "Jun ",
    "Jul ",
    "Aug ",
    "Sep ",
    "Oct ",
    "Nov ",
    "Dec ",
  ];
  const transactionType = ["Home Expense", "Personal Expense", "Income"];

  const fromAccount = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle ",
    "Core Realtors",
    "Big Block",
  ];

  //  .................................... validations..........................................

  const checkTransactionDate = (e) => {


    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = date.getDate();
    let transDate = e.target.value;
    let transArray = transDate.split("-");

    if (transArray.length !== 0) {
      if (parseInt(transArray[0]) <= year) {
        
        if (parseInt(transArray[1]) < parseInt(month)) {
           
            setTest((prev) => ({ ...prev, transactionDate: false }));
            setformValues((prev)=>({...prev, transactionDate:transDate}));
        } else {
            if(parseInt(transArray[1]) > parseInt(month)){
                setTest((prev) => ({ ...prev, transactionDate: true }));
                setformValues((prev)=>({...prev, transactionDate:""}));
            }
        else{
            if (parseInt(transArray[1]) == parseInt(month)) {
                if (parseInt(transArray[2]) <= day) {
                    setTest((prev) => ({ ...prev, transactionDate: false }));
                    setformValues((prev)=>({...prev, transactionDate:transDate}));
    
                } else {
                  
                  setTest((prev) => ({ ...prev, transactionDate: true }));
                  setformValues((prev)=>({...prev, transactionDate:""}));
    
                }
              }
        }
        
        }
      }
    } else {
      
      setTest((prev) => ({ ...prev, transactionDate: true }));
      setformValues((prev)=>({...prev, transactionDate:""}));
    }

    


    console.log(formValues);
    console.log(test);
    
    // setTest((prev) => ({ ...prev, transactionDate: true }));
  };

  const MonthYear=(e)=>{
    let result=parseInt((e.target.value))
    // var month = date.toLocaleString('default', { month: 'short' });
    let month=parseInt(date.getMonth())
   
    console.log(month)
    console.log(result)


    if(result<=month){
        console.log("dattas")
        setformValues((prev)=>({...prev,monthYear:result}))
        setTest((prev)=>({...prev,monthYear: false}))
    }
    else{
        setformValues((prev)=>({...prev,monthYear:""}))
        setTest((prev)=>({...prev,monthYear: true}))
    }
    
    console.log(formValues);
    console.log(test);
  }

  const checkTransactionType=(e)=>{
    let result=e.target.value;
    console.log(result)
    if(result=="Select Transaction Type"){
        console.log("Transaction Type")
        setTest((prev)=>({...prev,transactionType:true}))
        setformValues((prev)=>({...prev,transactionType:""}))
    }
    else{
        setTest((prev)=>({...prev,transactionType:false}))
        setformValues((prev)=>({...prev,transactionType:result}))
    }
    console.log(formValues)
    console.log(test)
  }

  const checkTo=(e)=>{
    let toData=e.target.value;
    let fromData=formValues.from;
    if(toData==fromData){
        setTest((prev)=>({...prev,from:true,to:true}))
        setformValues((prev)=>({...prev,from:"",to:""}))
    }

    else{
        setTest((prev)=>({...prev,from:false,to:false}))
        setformValues((prev)=>({...prev,from:fromData,to:toData}))
    }
  }

  const checkAmount=(e)=>{
    console.log(e.target.value)
    let formatting_options = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 3,
     }
    
    let amount=e.target.value;
    let amountReg=/[0-9]/;
    if(amountReg.test(amount)){
        let price = parseInt(amount);
     var finalAmount = price.toLocaleString("en-US",
     formatting_options);
     console.log(finalAmount,"final Amount")
    //  setAmount((prev) => ({...prev, finalAmount}) )
     setformValues((prev)=>({...prev,amount:finalAmount}))
     setTest((prev)=>({...prev,amount:false}))
    }
    else{
        console.log("no error in amount")
        setTest((prev)=>({...prev,amount:true}))
        setformValues((prev)=>({...prev,amount:""}))
    }
  }

  const checkNotes=(e)=>{
    let notes=e.target.value;
    if(notes.length<=250){
        setformValues((prev)=>({...prev,notes:notes}))
        setTest((prev)=>({...prev,notes:false}))



    }
    else{   setformValues((prev)=>({...prev,notes:""}))
    setTest((prev)=>({...prev,notes:true}))


    }
  }



  const formhandler=(e)=>{
    let commbineddata=[];

    // // test.forEach((element,index) => {
    // //     if(test.element==false || test.element==""){
    // //         alert("Some Fieldsdata are not valid Please solve the error first")
    // //         e.preventDefault()
            
    // //     }
        
    // });
    if( test.transactionDate==false &&
    test.monthYear==false &&
   test.transactionType==false &&
    test.from==false &&
    test.to==false &&
   test.amount==false &&
    test.receipt==false &&
   test.notes==false ){

    if(formValues.transactionDate!=="" &&
    formValues.monthYear!=="" &&
    formValues.transactionType!==""&&
    formValues.from!==""&&
    formValues.to!=="" &&
    formValues.amount!=="" &&
    formValues.receipt!=="" &&
    formValues.notes!=="" ){

console.log("success in formvalues" )
// To store data
let localdata=localStorage.getItem('FormData');
if(localdata.length==0){
    localStorage. setItem('Form Data', JSON. stringify(formValues)); 
}
else{
    let getdata=localStorage.getItem('FormData');

    // commbineddata.push(getdata)
    // combineddata.push(formValues)

    // localStorage. setItem('Form Data', JSON. stringify(combineddata)); 
}

console.log(localStorage.getItem('Form Data'))
e.preventDefault()
    }


else{
    console.log(formValues)
    console.log(test)
alert(" Some fields are missing ")
e.preventDefault()
}
   }
   else{
    alert("Please Enter valid fields data")
    e.preventDefault()
   }

  
  }
  return (
    <div className="container">
      <div className="subcontainer">
        <h2 className="header-h2">Finance Tracker</h2>
        <form onSubmit={formhandler}>
          <div class="mb-3">
            <label htmlFor="transDate" className="form-label">
              Transaction Date
            </label>
            <input
              type="Date"
              className="form-control"
              onChange={checkTransactionDate}
            />
        
            <div className="form-text  text-danger ">
            
              {test.transactionDate
                ? "Please Enter valid transaction Date"
                : ""}
            </div>
          </div>

          <div class="mb-3">
            <label htmlFor="monthYear" className="form-label">
              Month Year
            </label>
            <select 
              className0="form-select" onChange={MonthYear}
              aria-label="Default select example"
            >
              <option selected>Select Month Year</option>
              {monthYear.map((item,index) => (
                <option value={index}>
                  {item}
                  {year}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
            
            {test.monthYear
              ? "Please Enter valid Month Year"
              : ""}
          </div>

          </div>

          <div class="mb-3">
            <label htmlFor="transacType" className="form-label">
              Transaction Type
            </label>
            <select
              className="form-select" onChange={checkTransactionType}
              aria-label="Default select example"
            >
              <option selected>Select Transaction Type</option>
              {transactionType.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <div className="form-text  text-danger ">
            
            {test.transactionType
              ? "Please Select Transaction Type"
              : ""}
          </div>

          </div>

          <div class="mb-3">
            <label htmlFor="FromAccount" className="form-label">
              From Account
            </label>
            <select
              className0="form-select"
              aria-label="Default select example" onChange={(e)=>{setformValues((prev)=>({...prev,from:e.target.value}))}}
            >
              <option selected>From Account</option>
              {fromAccount.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <label htmlFor="toAccount" className="form-label">
              To Account
            </label>
            <select
              className0="form-select"
              aria-label="Default select example" onChange={checkTo}
            >
              <option selected>To Account</option>
              {fromAccount.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <div className="form-text  text-danger ">
            
            {test.to
              ? "From and To must be not same"
              : ""}
          </div>
          </div>

          <div class="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>

            <div class="input-group mb-3">
              <span class="input-group-text">Rs</span>
              <input
                type="text"
                class="form-control" value={formValues.amount} onChange={checkAmount} 
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="input-group-text">.00</span>
            </div>
            <div i className="form-text text-danger">{test.amount?"Please Enter only Numeric Values":''}</div>
          </div>

          <div class="mb-3">
            <label htmlFor="receipt" className="form-label">
              Receipt
            </label>
            <input type="file" className="form-control"  onChange={(e)=>{formValues.receipt=e.target.value}}/>
            <div id="emailHelp" className="form-text text-danger">
              * Receipt upload size should not exceed 1 MB, allow only .png .jpg
              .jpeg{" "}
            </div>
          </div>
          <div class="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <div class="form-floating">
              <textarea
                class="form-control" onChange={checkNotes}
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label for="floatingTextarea">Enter Note Here</label>
            </div>
            <div i className="form-text text-danger">{test.notes?"You only Enter 250 or less Characters in notes":''}</div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success center" onSubmit={formhandler}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
