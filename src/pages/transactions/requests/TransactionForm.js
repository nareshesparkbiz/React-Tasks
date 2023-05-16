
import React, { useEffect,useContext ,useState} from "react";
import { useForm } from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import { monthYear, transactionType, fromAccount } from "../../../utils/constants"
import { convertImage,crossEvent } from "../../../utils/helper";
import {transactionFormSchema} from "../../../utils/validation";
import '../../../assets/styles/transactionForm.css'
import  {addTransaction,removeTransaction,editTransaction,viewTransaction} from "../../../redux/stores/slices/transactionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Navbar} from '../../navbar/Navbar'


export const AddTransaction = () => {
  
  const {id}=useParams();  // Params
  // console.log(id,"id in edit form")
  const navigate=useNavigate();   //Navigation

  var date1 = new Date();
  var year = date1.getFullYear();

  const transactionData = useSelector((state) => {     //Selector
    return state.userTransactions;
  });

// console.log(transactionData,"redux data in login");

const dispatch=useDispatch()   // dispatch





//   const {transaction1,settransaction1}= useContext()
  const [currentuser,setcurrentUser]=useState([])


  useEffect(()=>{
    if(id!=undefined ){
      
      const userData=[...transactionData]
      // console.log("b=======================================")
      for(let i in userData){
          if(id==userData[i].id){
              // console.log("e=======================================")
           setcurrentUser(userData[i])
          //  console.log(currentuser,"current user")
           for(let j in userData[i]){
            // console.log(j,userData[i][j],"All saved sartd")
            setValue(j,userData[i][j])
           }
          }
      }

      let imagId=document.getElementById("imagefile"); 
      imagId.style.visibility='hidden'

    }  

     
   
  
    },[id])




  
  
  



 
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(transactionFormSchema), mode: "all"});






  const FieldGenerator = (value, type,constants) => {
    const data1 = { value };

    console.log(data1, "data");
    console.log(typeof data1, "data");

    switch (type) {
      case "select":
        return (
          <div className="mb-3">
            <label htmlFor={value} className="form-label">
              {value}
            </label>
            <select
              {...register(`${value}`)}
              // defaultValue={updateData == undefined ? "" : updateData.monthYear}
              className="form-select"
              // onChange={MonthYear}

              aria-label="Default select example"
            >
              <option value={""}>Select {value}</option>

              {constants.map((item, index) => (
                <option key={item} value={index}>
                  {item}
                  {year}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {/* {test.monthYear ? "Please Enter valid Month Year" : ""} */}
              {errors[value]?.message}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="fields">
            <label htmlFor={value}>Enter {value}</label>
            <input
              name={value}
              {...register(`${value}`)}
              type={type}
              placeholder={value}
            />
            {errors[value]?.message}
          </div>
        );
    }
  };



  const formhandler = async (data) => {

    const newTransaction=[...transactionData]
    

    // alert("form Submit Succesfully")
    // console.log(data, "data ===========================================================");

    if (typeof data.receipt !== "string") {
      data.receipt = await convertImage(data.receipt[0]);
      var dateString = new Date(data.transactionDate.getTime() - (data.transactionDate.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split("T")[0];
      data.transactionDate = dateString

    }
    // console.log(data, "data update Success");

    // ----------------context-------------------------

    // const [transaction,setTransaction] = useContext(Trdfgsdf)

  

    if(newTransaction.length>0){
        if(id==undefined){
            let previd = transactionData.at(transactionData.length-1).id;
            // console.log("previous id",previd);
            data['id']=previd+1;
        
            dispatch(addTransaction(data))
            alert("Transaction Add Successful");

        }
        else{
            dispatch(editTransaction(data))
            alert("Transaction Update Successfully");
            navigate('/all-transaction/view-transaction')

        }
         
            
            
 
 
         
         
 
 
     }
     else{
         data['id']=1 
         dispatch(addTransaction(data))
         alert("Transaction Add Successful");
         
         
     }
     reset()
  navigate('/all-transaction/view-transaction')
  };

  return (

    <>
    <Navbar/>
    <div className="container">
      <div className="subcontainer">
        {id == undefined ? "" : <h1>Edit Form</h1>}
        <h2 className="header-h2">Finance Tracker</h2>
        <form onSubmit={handleSubmit(formhandler)}>
          <div className="mb-3">
            <label htmlFor="transDate" className="form-label">
              Transaction Date
            </label>
            <input
              type="Date"
              {...register("transactionDate")}
              // defaultValue={
              //   updateData == undefined ? "" : updateData.transactionDate
              // }
              className="form-control"
              // onChange={checkTransactionDate}
            />

          

            <div className="form-text  text-danger ">
              {/* {test.transactionDate
              ? "Please Enter valid transaction Date"
              : ""} */}
              {errors.transactionDate?.message}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="monthYear" className="form-label">
              Month Year
            </label>
            <select
              {...register("monthYear")}
              // defaultValue={updateData == undefined ? "" : updateData.monthYear}
              className="form-select"
              // onChange={MonthYear}

              aria-label="Default select example"
            >
              <option value={""}>Select Month Year</option>

              {monthYear.map((item, index) => (
                <option key={item} value={index}>
                  {item}
                  {year}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {/* {test.monthYear ? "Please Enter valid Month Year" : ""} */}
              {errors.monthYear?.message}
            </div>
          </div>

          {/* {FieldGenerator("monthYear","select",monthYear)} */}

          <div className="mb-3">
            <label htmlFor="transacType" className="form-label">
              Transaction Type
            </label>
            <select
              {...register("transactionType")}
              // defaultValue={
              //   updateData == undefined ? "" : updateData.transactionType
              // }
              className="form-select"
              // onChange={checloginkTransactionType}
              aria-label="Default select example"
            >
              <option value={""}>Select Transaction Type</option>
              {transactionType.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {/* {test.transactionType ? "Please Select Transaction Type" : ""} */}

              {errors.transactionType?.message}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="FromAccount" className="form-label">
              From Account
            </label>
            <select
              // defaultValue={updateData == undefined ? "" : updateData.from}
              {...register("from")}
              className="form-select"
              aria-label="Default select example"
              // onChange={(e) => {checkFrom(e)}}
            >
              <option value={""}>From Account</option>
              {fromAccount.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div i className="form-text text-danger">
              {/* {test.amount ? "Please Enter only Numeric Values" : ""}
               */}
              {errors.from?.message}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="toAccount" className="form-label">
              To Account
            </label>
            <select
              // defaultValue={updateData == undefined ? "" : updateData.to}
              {...register("to")}
              className="form-select"
              aria-label="Default select example"
              // onChange={checkTo}
            >
              <option value={""}>To Account</option>
              {fromAccount.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="form-text  text-danger ">
              {/* {test.to ? "From and To must be not same" : ""} */}
              {errors.to?.message}
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
                //   defaultValue={updateData == undefined ? "" : updateData.amount}
                {...register("amount")}
                //   onChange={checkAmount}
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="input-group-text">.00</span>
            </div>
            <div i className="form-text text-danger">
              {/* {test.amount ? "Please Enter only Numeric Values" : ""} */}
              {errors.amount?.message}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="receipt" className="form-label">
              Receipt
            </label>
            <input
              type="file"
              id="imagefile"
              {...register("receipt")}
              className="form-control"
              // onChange={checkReceipt}
            />
            <div className="form-text text-danger">
              {/* {test.receipt
              ? "* Receipt upload size should not exceed 1 MB, allow only .png .jpg.jpeg"
              : ""} */}
              {errors.receipt?.message}
            </div>
            <div className=" text-danger">
              <img
              src= { id!=undefined?currentuser.receipt:""}
              height="200"
              alt=""
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
                {...register("notes")}
                //   defaultValue={updateData == undefined ? "" : updateData.notes}
                //   onChange={checkNotes}
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Enter Note Here</label>
            </div>
            <div i className="form-text text-danger">
              {/* {test.notes
              ? "You only Enter 250 or less Characters in notes"
              : ""} */}
              {errors.notes?.message}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success center"
              // onSubmit={formhandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
  );
};
