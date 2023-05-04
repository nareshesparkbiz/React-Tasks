import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import "./../css/Form.css";


export const Form = (props) => {

  const updateData = props.data;
  console.log(updateData, "update data");
  const navigate=useNavigate();

  var date = new Date();
  var year = date.getFullYear();
  const [demo , setDemo] = useState([])

  useEffect(()=>{
    setDemo([1,2,3,3,3,3,3,3,3,3,3])
  },[])
  useEffect(() => {console.warn("Props are coming")},[props.data])



    const values = {
      transactionDate: "",
      monthYear: "",
      transactionType: "",
      from: "",
      to: "",
      amount: 0,
      receipt: "",
      notes: "",
    }; 


    
    const [formValues, setformValues] = useState(values);
   
    useEffect(() => {
      if(updateData!=undefined){
        setformValues(updateData)
      }
      },[])



    useEffect(() => {
    
      console.warn("FormVlaues state are working properly")
    },[formValues])
    

 
 

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
 
  const [test, setTest] = useState(formError1);

  useEffect(()=>{
  
    console.warn("Formerror state are working properly")
  },[test])

  const [checkempty,setcheckempty]=useState();

  useEffect(()=>{
    setcheckempty(formError1)
  },[])






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
      if (parseInt(transArray[0]) < year) {
        setTest((prev) => ({ ...prev, transactionDate: false }));
        setformValues((prev) => ({ ...prev, transactionDate: transDate }));
      } else {
        if (parseInt(transArray[0]) == year) {
          if (parseInt(transArray[1]) < parseInt(month)) {
            setTest((prev) => ({ ...prev, transactionDate: false }));
            setformValues((prev) => ({ ...prev, transactionDate: transDate }));
          } else {
            if (parseInt(transArray[1]) > parseInt(month)) {
              setTest((prev) => ({ ...prev, transactionDate: true }));
              setformValues((prev) => ({ ...prev, transactionDate: "" }));
            } else {
              if (parseInt(transArray[1]) == parseInt(month)) {
                if (parseInt(transArray[2]) <= day) {
                  setTest((prev) => ({ ...prev, transactionDate: false }));
                  setformValues((prev) => ({
                    ...prev,
                    transactionDate: transDate,
                  }));
                } else {
                  setTest((prev) => ({ ...prev, transactionDate: true }));
                  setformValues((prev) => ({ ...prev, transactionDate: "" }));
                }
              }
            }
          }
        }
      }
    } else {
      setTest((prev) => ({ ...prev, transactionDate: true }));
      setformValues((prev) => ({ ...prev, transactionDate: "" }));
    }

    console.log(formValues);
    console.log(test);

    // setTest((prev) => ({ ...prev, transactionDate: true }));
  };

  const MonthYear = (e) => {
    let result = parseInt(e.target.value);
    // var month = date.toLocaleString('default', { month: 'short' });
    let month = parseInt(date.getMonth());

    console.log(month);
    console.log(result);

    if (result <= month) {
      console.log("dattas");
      setformValues((prev) => ({ ...prev, monthYear: result }));
      setTest((prev) => ({ ...prev, monthYear: false }));
    } else {
      setformValues((prev) => ({ ...prev, monthYear: "" }));
      setTest((prev) => ({ ...prev, monthYear: true }));
    }

    console.log(formValues);
    console.log(test);
  };

  const checkTransactionType = (e) => {
    let result = e.target.value;
    console.log(result);
    if (result == "Select Transaction Type") {
      console.log("Transaction Type");
      setTest((prev) => ({ ...prev, transactionType: true }));
      setformValues((prev) => ({ ...prev, transactionType: "" }));
    } else {
      setTest((prev) => ({ ...prev, transactionType: false }));
      setformValues((prev) => ({ ...prev, transactionType: result }));
    }
    console.log(formValues);
    console.log(test);
  };


  const checkFrom=(e)=>{
    let fromData=e.target.value;
    let toData=formValues.to;
    console.log(toData,"in fromData")

    if(toData==""){
      setformValues((prev) => ({ ...prev, from:fromData }));
      setTest((prev) => ({ ...prev, from:false }));
    }
    else{
      if(fromData==toData){
        setTest((prev) => ({ ...prev, to:true }));
      }
      else{
        setTest((prev) => ({ ...prev, to:false }));
        setformValues((prev) => ({ ...prev, from:fromData }));

      }
    }

  }

  const checkTo = (e) => {
    let result={...formValues}
    let toData = e.target.value;
    let fromData = result.from;
    if (toData == fromData) {
      console.log("if true")
      setTest((prev) => ({ ...prev, to: true }));
      // setformValues((prev) => ({ ...prev, to: "" }));
      console.log(result.from,"before ")
    } else {
      console.log("else true")

      setTest((prev) => ({ ...prev, to: false }));
     
      console.log(result.from)

    }

    setformValues((prev) => ({ ...prev,to: toData }));
  };

  const checkAmount = (e) => {
   
    console.log(e.target.value);
    let Amount = e.target.value;


    let amountReg = /[0-9]/;
    if (amountReg.test(Amount)) {

      const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);

      let finalAmount = numberFormat(Amount) 
      console.log(finalAmount, "final Amount");

      setformValues((prev) => ({ ...prev, amount:finalAmount }));
      setTest((prev) => ({ ...prev, amount: false }));

    } else {
      console.log("no error in amount");
      setTest((prev) => ({ ...prev, amount: true }));
      setformValues((prev) => ({ ...prev, amount: "" }));
    }
  };

  const checkNotes = (e) => {
    let notes = e.target.value;
    if (notes.length <= 250) {
      setformValues((prev) => ({ ...prev, notes: notes }));
      setTest((prev) => ({ ...prev, notes: false }));
    } else {
      setformValues((prev) => ({ ...prev, notes: "" }));
      setTest((prev) => ({ ...prev, notes: true }));
    }
  };

  let imgSrc="";


  const crossEvent=()=>{
    let imagId=document.getElementById("imagefile"); 
    const preview = document.querySelector("img");
    preview.src="";
    imagId.style.visibility='visible'
    
    
  }

useEffect(()=>{
  if(updateData!=undefined){
    
    imgSrc=updateData.receipt;

    let imagId=document.getElementById("imagefile");
    
    imagId.style.visibility='hidden'
     
  }   
  
},[])
 

  const checkReceipt = (e) => {

    
   
      const preview = document.querySelector("img");
    
      const file = document.querySelector("input[type=file]").files[0];
      console.log(file, "download");
      const reader = new FileReader();
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        reader.addEventListener(
          "load",
          () => {
            // convert image file to base64 string
            let Data = reader.result.split(";");
            console.log(Data[0]);
  
            let img1 = reader.result;
            setformValues((prev) => ({ ...prev, receipt: img1 }));
            setTest((prev) => ({ ...prev, receipt: false }));
            console.log(formValues, test, "check receipt status");
  
            preview.src = reader.result;
            console.log("valid receipt");
          },
          false
        );
      } else {
        console.log("invalid receipt");
        setformValues((prev) => ({ ...prev, receipt: "" }));
        setTest((prev) => ({ ...prev, receipt: true }));
        console.log(formValues, test, "check receipt status");
        preview.src = "";
      }
      if (file) {
        reader.readAsDataURL(file);
      }


  };

 

  const formhandler = (e) => {
    if (
      test.transactionDate == false &&
      test.monthYear == false &&
      test.transactionType == false &&
      test.from == false &&
      test.to == false &&
      test.amount == false &&
      test.receipt == false &&
      test.notes == false
    ) {
      if (
        formValues.transactionDate !== "" &&
        formValues.monthYear !== "" &&
        formValues.transactionType !== "" &&
        formValues.from !== "" &&
        formValues.to !== "" &&
        formValues.amount !== "" &&
        formValues.receipt !== "" &&
        formValues.notes !== ""
      ) {
        let localdata = localStorage.getItem("Formnew");

        if (localdata == null) {
          // To store data
          let result = [];
          result.push(formValues);
          result[0]["id"] = 1;
          localStorage.setItem("Formnew", JSON.stringify(result));
          navigate('/show-table')
        } else {
          let getdata = localStorage.getItem("Formnew");
          let resultData = JSON.parse(getdata);
          
          if(updateData==undefined){
           

            let previd = resultData.at(resultData.length-1).id;
  
            let newdata = {...formValues};
            newdata["id"] = previd+1;
  
  
            resultData.push(newdata);
            // resultData
            // combineddata.push(getdata)
  
            localStorage.setItem("Formnew", JSON.stringify(resultData));
            navigate('/show-table')


          }
          else{  
            console.log(resultData[0].id,"dddddd")
            let updateId=updateData.id;
          console.log(updateId,"update data id")
          for(let i in resultData){
            console.log(i)
            if(updateId==resultData[i].id){
              console.log("bsdjhsbfjh")
              resultData[i]=formValues;
              break;
          }

         
        }
        console.log(resultData,"update data")

        localStorage.setItem("Formnew", JSON.stringify(resultData));
            
          }

        

          e.preventDefault();
        }
      } else {
        console.log(formValues);
        console.log(test);
        const emptyState={...test};
        console.log(emptyState)
       for(let i in emptyState){
        emptyState[i]=true
       }
        setTest(emptyState)
      
      }
    } else {
      alert("Please Enter valid fields data");
      e.preventDefault();
    }
  };

  return (
    <div className="container">
      <div className="subcontainer">
        {updateData == undefined ? "" : <h1>Edit Form</h1>}
        <h2 className="header-h2">Finance Tracker</h2>
        <form onSubmit={formhandler}>
          <div className="mb-3">
            <label htmlFor="transDate" className="form-label">
              Transaction Date
            </label>
            <input
              type="Date"
              defaultValue={
                updateData == undefined ? "" : updateData.transactionDate
              }
              className="form-control"
              onChange={checkTransactionDate}
            />

            <div className="form-text  text-danger ">
              {test.transactionDate
                ? "Please Enter valid transaction Date"
                : ""}
            </div>
            

          </div>

          <div className="mb-3">
            <label htmlFor="monthYear" className="form-label">
              Month Year
            </label>
            <select
              defaultValue={updateData == undefined ? "" : updateData.monthYear}
              className="form-select"
              onChange={MonthYear}
              aria-label="Default select example"
            >
              <option>Select Month Year</option>

              {monthYear.map((item, index) => (
                <option key={item} value={index}>
                  {item}
                  {year}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {test.monthYear ? "Please Enter valid Month Year" : ""}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="transacType" className="form-label">
              Transaction Type
            </label>
            <select
              defaultValue={
                updateData == undefined ? "" : updateData.transactionType
              }
              className="form-select"
              onChange={checkTransactionType}
              aria-label="Default select example"
            >
              <option>Select Transaction Type</option>
              {transactionType.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {test.transactionType ? "Please Select Transaction Type" : ""}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="FromAccount" className="form-label">
              From Account
            </label>
            <select
              defaultValue={updateData == undefined ? "" : updateData.from}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {checkFrom(e)}}
                
              
            >
              <option>From Account</option>
              {fromAccount.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="toAccount" className="form-label">
              To Account
            </label>
            <select
              defaultValue={updateData == undefined ? "" : updateData.to}
              className="form-select"
              aria-label="Default select example"
              onChange={checkTo}
            >
              <option>To Account</option>
              {fromAccount.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {test.to ? "From and To must be not same" : ""}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>

            <div className="input-group mb-3">
              <span class="input-group-text">Rs</span>
              <input
                type="text"
                class="form-control"
                defaultValue={updateData == undefined ? "" : updateData.amount}
                onChange={checkAmount}
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="input-group-text">.00</span>
            </div>
            <div i className="form-text text-danger">
              {test.amount ? "Please Enter only Numeric Values" : ""}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="receipt" className="form-label">
              Receipt
            </label>
            <input
              type="file" 
              id="imagefile"
              className="form-control"
              onChange={checkReceipt}
            />
            <div className="form-text text-danger">
              {test.receipt
                ? "* Receipt upload size should not exceed 1 MB, allow only .png .jpg.jpeg"
                : ""}
            </div>
            <div className=" text-danger">
              
              <img
                src={updateData == undefined ? "" : updateData.receipt}
                height="200"
                alt="Please upload only  .png .jpg.jpeg"
              />
              <span className="crossButton" onClick={crossEvent}>X</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <div className="form-floating">
              <textarea
                className="form-control"
                defaultValue={updateData == undefined ? "" : updateData.notes}
                onChange={checkNotes}
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Enter Note Here</label>
            </div>
            <div i className="form-text text-danger">
              {test.notes
                ? "You only Enter 250 or less Characters in notes"
                : ""}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success center"
              onSubmit={formhandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
