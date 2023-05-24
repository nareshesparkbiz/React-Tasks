
import React, { useEffect,useRef,useState} from "react";
import { useForm,FieldValues } from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import { monthYear, transactionType, fromAccount,LanguageData } from "../../../utils/constants"
import { convertImage,crossEvent } from "../../../utils/helper";
import {transactionFormSchema} from "../../../utils/validation";
import '../../../assets/styles/transactionForm.css'
import  {addTransaction,removeTransaction,editTransaction,viewTransaction} from "../../../redux/stores/slices/transactionSlice";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import {Navbar} from '../../navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../../utils/helper'
import FormField from '../../../components/FormFiels'
import {addLanguage } from '../../../redux/stores/slices/languageSelection'
import { useDispatch } from "react-redux";




export const AddTransaction = () => {
  const {id}=useParams();  // Params
  // console.log(id,"id in edit form")
  const navigate=useNavigate();   //Navigation

  var date1 = new Date();
  var year = date1.getFullYear();

  const transactionData = useAppSelector((state) => {     //Selector
    return state.userTransactions;
  });

  const selectLanguageData=useAppSelector((state) => { 
    return state.languageSelection;
  });
  console.log('selectlanguageData::: ', selectLanguageData);

  const [currentLang,setCurrentlang]=useState< { [key: string]: any }>(selectLanguageData);

  useEffect(()=>{
    setCurrentlang(selectLanguageData);
  },[selectLanguageData])

// console.log(transactionData,"redux data in login");

const dispatch=useDispatch()   // dispatch

// -----------------check data----------

console.log('monthYear::: ', monthYear);
console.log('transactionType::: ', transactionType);
console.log('fromAccount::: ', fromAccount);

//   const {transaction1,settransaction1}= useContext()
  const [currentuser,setcurrentUser]=useState< { [key: string]: undefined }>({});


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

      const imgId:any= document.getElementById("imagefile")
      imgId.style.visibility='hidden'; 

    }  

     
  
  
    },[id])






  
  
  



 
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({ resolver: yupResolver(transactionFormSchema), mode: "all"});



  const formhandler =handleSubmit(async(data) => {

    console.log('data::: ', data);
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
},2000)   });



const changeLang=(event:React.ChangeEvent<HTMLSelectElement>)=>{
  let langSelect=event.target.value;
  console.log('langSelect::: ', langSelect);
  dispatch(addLanguage(langSelect));


}

  return (

    <>
    <Navbar/>
    {/* {console.log(currentLang['transationDate'],"Error")} */}
<div className="dropDown">
  <select name="lang" id="lang" onChange={(e)=>{changeLang(e)}}>
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
  </select>
</div>

    <div className="container">
      <div className="subcontainer">
        {id == undefined ? "" : <h1>{currentLang['editForm']}</h1>}
        <h2 className="header-h2">{currentLang['financetracker']}</h2>
      
        <form onSubmit={formhandler}>
           {FormField("transactionDate","Date",currentLang['transactionDate'],[register,errors])}
          
      

           {/* {FormField("monthYear","select",currentLang['monthYear'],[register,errors],'',monthYear,year)} */}
           <div className="mb-3">
                <label htmlFor="Month Year" className="form-label">
                Month Year
                </label>
                <select
                  className="form-select"
                  {...register('monthYear', { required: true })}
              

                  aria-label="Default select example"
                >
               <option value={""}>Select MonthYear</option>
    
                  
                  {monthYear?.map((item:string, index:number) => {
                    return( <option key={item} value={index}>{item}{year}</option>

                    )
                  
                    
                   
                    
                       })}
                
                </select>
                <div className="form-text  text-danger ">
            
                  {errors.monthYear?.message?.toString()}
                </div>
              </div>
           
         
          {FormField("transactionType","select",currentLang['transactionType'],[register,errors],'',transactionType)}

        
          {FormField("from","select",currentLang['from'],[register,errors],'',fromAccount)}
       
           {FormField("to","select",currentLang['to'],[register,errors],'',fromAccount)}

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
            {currentLang['amount']}
            </label>

            <div className="input-group mb-3">
              <span className="input-group-text">   {currentLang['Rs']}</span>
              <input
                type="text"
                className="form-control"
                //   defaultValue={updateData == undefined ? "" : updateData.amount}
                {...register("amount")}
                //   onChange={checkAmount}
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>
            <div  className="form-text text-danger">
              {/* {test.amount ? "Please Enter only Numeric Values" : ""} */}
              {errors.amount?.message?.toString()}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="receipt" className="form-label">
            {currentLang['receipt']}
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
           {errors.receipt?.message?.toString()}
            </div>
            <div className=" text-danger">
              <img
              src={ id!=undefined?currentuser['receipt']:""}
              height="200"
              alt=""
            />
              <span className="crossButton" onClick={crossEvent}>X</span>
            </div>
          </div>

          {FormField("notes","textarea",currentLang['notes'],[register,errors],'Notes')}


         
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success center"
              // onSubmit={formhandler}
            >
             { currentLang['submit']
            }            </button>
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
