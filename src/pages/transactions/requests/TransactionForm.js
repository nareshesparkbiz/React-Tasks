
import React, { useEffect,useState} from "react";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../../utils/helper'
import FormField from '../../../components/FormFiels'




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
            notify("Transaction Add Succefully")
            // alert("Transaction Add Successful");

        }
        else{
            dispatch(editTransaction(data))
            notify("Transaction Update Succefully")

            // alert("Transaction Update Successfully");
            // navigate('/all-transaction/view-transaction')

        }
         
            
            
 
 
         
         
 
 
     }
     else{
         data['id']=1 
         dispatch(addTransaction(data))
         notify("Transaction Add Succefully")

        //  alert("Transaction Add Successful");
        
     }
     reset()
 setTimeout(()=>{navigate('/all-transaction/view-transaction')
},2000)   };

  return (

    <>
    <Navbar/>
    <div className="container">
      <div className="subcontainer">
        {id == undefined ? "" : <h1>Edit Form</h1>}
        <h2 className="header-h2">Finance Tracker</h2>
        <form onSubmit={handleSubmit(formhandler)}>
           {FormField("transactionDate","Date","Transaction Date",[register,errors])}
          
      

          {FormField("monthYear","select","Month Year",[register,errors],'',monthYear,year)}
         
          {FormField("transactionType","select","TransactionType",[register,errors],'',transactionType)}

        
          {FormField("from","select","From",[register,errors],'',fromAccount)}
       
           {FormField("to","select","To",[register,errors],'',fromAccount)}

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

          {FormField("notes","textarea","Enter Notes",[register,errors],'Notes')}


         
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
      <div className="toast-container">  <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      /></div>
    </div>

    </>
  );
};
