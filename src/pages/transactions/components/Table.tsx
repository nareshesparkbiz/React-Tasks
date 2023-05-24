
import React, {  useEffect, useState } from "react";
// import { ShowTransaction } from "../ShowTransaction";
import { Link } from "react-router-dom";
import {Pagination} from "./Pagination";
// import '.././css/showTable.css'
// import {userContext} from "../../../contexts/Context"
import {amountFormatter} from '../../../utils/helper'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import  {removeTransaction} from "../../../redux/stores/slices/transactionSlice";
import { useDispatch } from "react-redux";



interface PropsData{
data:any[]
}


export const DataTable = (props:PropsData) => {


  const originalData=props.data;

  // console.log(originalData,"dtfdsadfgasdf")

   const LanguageData=useAppSelector((state) => { 
    return state.languageSelection;
  });

  
 
  const dispatch=useDispatch()   // dispatch


  const [isSortClick, setIsSortClick] = useState(0);
  const [searched,setsearched]= useState<any>([])
  // const [showData,setshowData]=useState([]);




  useEffect(()=>{
    let a = [...originalData]
    setsearched(a)
  },[props])
  

  type paginationType={
    list: string[];
    pageno: number;
    showPage:number;
    totalpageCount:number;
    pagelimit:number;
  }

  let paginationScope:paginationType={
    list:[],
    pageno:1,
    
    showPage:0,
    totalpageCount:0,
    pagelimit:3,
}

  const [paginationData,setPaginationData]=useState(paginationScope)

// console.log(originalData,"original Data")

useEffect(()=>{
 
    let totpage:any=Math.ceil(originalData.length/paginationData.pagelimit)
    // console.log(totpage)
    let pagelist=[]
    let i:any=0
    for( i in totpage){
        pagelist.push(totpage[i])
    }
    setPaginationData({
        ...paginationData,
        pageno: 1,
        totalpageCount: totpage,
        list: pagelist,
      });
    
},[originalData,paginationData.pagelimit])


function changePageNo(pageno:number):any{
    setPaginationData({...paginationData,pageno:pageno})
}


const [cuurentSortElement, setCuurentSortElement] = useState("");
  


// --------------------------------Delete Transactions--------------------------------------

   const deleteTransaction=(id:number)=>{
   
    if(confirm('Are you sure you want to delete that transaction?')){
      dispatch(removeTransaction(id))
    }
      // console.log(id,"transaction Id delete ")
    
   
      }
    

  // -------------------------Sorting--------------------------------------------------------

  const dataSort = (list:string[], key:string, sortType:string) => {
    return list.sort(function (a:any, b:any):any {
      let x = a[key];
      let y = b[key];
      if (sortType === "asc") {
        if (key == "transactionDate") {
          return new Date(x).valueOf() - new Date(y).valueOf();
        }
        if (key == "monthYear") {
          return x - y;
        }
        if (key == "amount") {
          x = Number(x);
          y = Number(y);
          return x < y ? -1 : x > y ? 1 : 0;
        }
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        if (key == "transactionDate") {
          return new Date(y).valueOf() - new Date(x).valueOf();
        }
        if (key == "monthYear") {
          return y - x;
        }
        if (key == "amount") {
          x = Number(x);
          y = Number(y);
          return x > y ? -1 : x < y ? 1 : 0;
        }
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  };

  const convertSort = (listData:string[], elementName:string) => {

    let sort = [...listData];


    if (isSortClick === 0 || elementName !== cuurentSortElement) {
      // console.log("ASC - ", elementName);
      const shortedArray = dataSort(sort, elementName, "asc");
      // console.log(shortedArray,"Asc Array")

      setsearched(shortedArray);
      const elementDom:any= document.querySelector('#'+elementName)
     elementDom.innerHTML="↑"
      // console.log(table1,"Ascending sort")

      setIsSortClick(1);
      setCuurentSortElement(elementName);
    }
    if (isSortClick === 1 && elementName === cuurentSortElement) {
      // console.log("DESC - ", elementName);
      const shortedArray = dataSort(sort, elementName,"desc");
      setsearched(shortedArray);
      // console.log(table1,"Descending sort")
      const elementDom:any= document.querySelector('#'+elementName)
      elementDom.innerHTML="↓"

      setIsSortClick(2);
    }
    if (isSortClick === 2 && elementName === cuurentSortElement) {
      // console.log("INIT - ", elementName);
      setsearched(props.data);
      // console.log(table1,"Without sort")
      const elementDom:any= document.querySelector('#'+elementName)
       elementDom.innerHTML=""
      setIsSortClick(0);
    }
    
  };

  // ----------------------------------------searching------------------------------
const searchHandler=()=>{
  const userData={...originalData}
  // console.log(userData)
  const searchDom:any= document.querySelector("#search")
  const searchField:any=searchDom.value
// console.log(searchField)

const filteredPersons = Object.values(userData).filter(
  person => {
    
    return (
    
      person
      .from
      .toLowerCase()
      .includes(searchField.toLowerCase())
      ||
      person
      .transactionDate
      
      .includes(searchField.toLowerCase())
      ||
      person
      .transactionType
      .toLowerCase()
      .includes(searchField.toLowerCase())
      ||
    
      person
      .to
      .toLowerCase()
      .includes(searchField.toLowerCase())
    );
  }


);

// console.log(filteredPersons,"searched datat")

setsearched(filteredPersons)

}





  return (
    <>

<div className="input-group ">
  <input type="search" id="search" className="form-control rounded searchButn" placeholder= {LanguageData['search']} aria-label="Search" aria-describedby="search-addon" />
  <button type="button" className="btn btn-outline-primary" onClick={searchHandler}>  {LanguageData['search']}</button>
</div>

    <div className="container">

      <table className="table">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => convertSort(searched, "transactionDate")}
            >
              {LanguageData['transactionDate']} <span id="transactionDate"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "monthYear")}>
            {LanguageData['monthYear']}<span id="monthYear"></span>
            </th>
            <th
              scope="col"
              onClick={() => convertSort(searched, "transactionType")}
            >
               {LanguageData['transactionType']} <span id="transactionType"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "from")}>
            {LanguageData['from']}  <span id="from"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "to")}>
            {LanguageData['to']} <span id="to"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "amount")}>
            {LanguageData['amount']}  <span id="amount"></span>
            </th>
            <th scope="col"> {LanguageData['receipt']} </th>
            <th scope="col" onClick={() => convertSort(searched, "notes")}>
            {LanguageData['notes']} <span id="notes"></span>
            </th>
            <th scope="col"> {LanguageData['view']} </th>
            <th scope="col"> {LanguageData['edit']} </th>
            <th scope="col"> {LanguageData['delete']} </th>
          </tr>
        </thead>

        <tbody>
        {searched.slice(
  ( paginationData.pageno-1)*paginationData.pagelimit,(paginationData.pageno
            )*paginationData.pagelimit).map((element:any, index:any) => (
            <tr key={index}>
              <td>{element.transactionDate}</td>
              <td>{element.monthYear}</td>
              <td>{element.transactionType}</td>
              <td>{element.from}</td>
              <td>{element.to}</td>
              <td>{amountFormatter(element.amount)}</td>
              <td><img src={element.receipt} style={{height:'50px',width:'50px'}} alt="" /></td>
              <td>{element.notes}</td>
              <td>
                <Link to={`/all-transaction/${element.id}`} state={element}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                </Link>
              </td>
              <td>
                <Link
                  to={`/all-transaction/edit-transaction/${element.id}`}
                  state={element}
                >
                {LanguageData['edit']}
                </Link>
              </td>
              <td><button onClick={()=>{deleteTransaction(index)}}>{LanguageData['delete']}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="container">
                <Pagination page={paginationData} changepageno={changePageNo}/>
            </div>

    </>
  );
};
