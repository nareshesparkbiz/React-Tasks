import React, { useEffect, useState } from "react";
import { View } from "./../../view_transaction";
import { Link } from "react-router-dom";
import '.././css/showTable.css'

export const DataTable = (props) => {


  const originalData=props.data;
  
 
  


  const [isSortClick, setIsSortClick] = useState(0);
  const [searched,setsearched]=useState([])
  const [showData,setshowData]=useState([]);




  useEffect(()=>{
    let a = [...props.data]
    setsearched(a)
  },[])
  

  // const [dataLength, setdataLength] = useState(totalData);
  // const [pagecount, setpagecount] = useState();
  const [perPage, setperPage] = useState(2);

  const [cuurentSortElement, setCuurentSortElement] = useState();

  const [sliceData,setslice]=useState([])

  useEffect(()=>{
    // document.getElementById("page1").backgroundColor =""
    let data = [...searched]
  let sliceData1= data.slice(0, perPage);

  setslice(sliceData1);

  },[searched])

  useEffect(()=>{
    settable1(sliceData)
  },[sliceData])




  
  const [table1, settable1] = useState(sliceData);


//   useEffect(()=>{
//     const sampleData=[...originalData];
// let descArray =[];
//     for(let i=sampleData.length-1;i>=0;i--){
//       console.log(sampleData[i],"sample data at index     ====================");
//       descArray.push(sampleData[i]);
//     }
//     console.log(descArray,"sdasdasssssssssssssssssssssssssssss==========================");

//     settable1(descArray);
    
//     },[])
  
  
  
  

  
  console.log(table1,"table1")


  useEffect(()=> {
    console.log('result called');

  
  },[originalData])

  var totalData = searched.length;

  // -------------------Pagination----------------

  const pagehandler = (item) => {   

// document.getElementById(item+1).style.backgroundColor ="green"

    // console.log(item, "item selected");
    let tableData = [...searched];
    const offset = item * perPage;
    // console.log(offset);

    const slice = tableData.slice(offset, offset + perPage);
    // console.log(slice, "slice data");
    settable1(slice);
  };

  let pageNo = Math.ceil(totalData / perPage);
  const pageno = [];
  for (let i = 1; i <= pageNo; i++) {
    pageno.push(i);
  }
  // console.log(pageno, "pageno");


  // -------------------------Sorting--------------------------

  const dataSort = (list, key, sortType) => {
    return list.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (sortType === "asc") {
        if (key == "transactionDate") {
          return new Date(x) - new Date(y);
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
          return new Date(y) - new Date(x);
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

  const convertSort = (listData, elementName) => {

    let sort = [...listData];


    if (isSortClick === 0 || elementName !== cuurentSortElement) {
      // console.log("ASC - ", elementName);
      const shortedArray = dataSort(sort, elementName, "asc");
      console.log(shortedArray,"Asc Array")

      setsearched(shortedArray);

      document.querySelector('#'+elementName).innerHTML="↑"
      // console.log(table1,"Ascending sort")

      setIsSortClick(1);
      setCuurentSortElement(elementName);
    }
    if (isSortClick === 1 && elementName === cuurentSortElement) {
      // console.log("DESC - ", elementName);
      const shortedArray = dataSort(sort, elementName);
      setsearched(shortedArray);
      // console.log(table1,"Descending sort")
      document.querySelector('#'+elementName).innerHTML="↓"

      setIsSortClick(2);
    }
    if (isSortClick === 2 && elementName === cuurentSortElement) {
      // console.log("INIT - ", elementName);
      setsearched(props.data);
      // console.log(table1,"Without sort")
      document.querySelector('#'+elementName).innerHTML=""
      setIsSortClick(0);
    }
    
  };
// ----------------------------amount formatter------------------------------------

function amountFormatter(amount){

   const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);

      let finalAmount = numberFormat(amount) 
      console.log(finalAmount, "final Amount");
      return finalAmount;
     
}


  // ----------------------------------------searching------------------------------
const searchHandler=()=>{
  const userData={...originalData}
  // console.log(userData)

  const searchField=document.querySelector("#search").value
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
  <input type="search" id="search" className="form-control rounded searchButn" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary" onClick={searchHandler}>search</button>
</div>

    <div className="container">

      <table className="table">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => convertSort(searched, "transactionDate")}
            >
              Transaction Date <span id="transactionDate"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "monthYear")}>
              Month Year<span id="monthYear"></span>
            </th>
            <th
              scope="col"
              onClick={() => convertSort(searched, "transactionType")}
            >
              Transaction Type <span id="transactionType"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "from")}>
              From Account <span id="from"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "to")}>
              To Account <span id="to"></span>
            </th>
            <th scope="col" onClick={() => convertSort(searched, "amount")}>
              Amount <span id="amount"></span>
            </th>
            <th scope="col">Receipt</th>
            <th scope="col" onClick={() => convertSort(searched, "notes")}>
              Notes <span id="notes"></span>
            </th>
            <th scope="col">View</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>

        <tbody>
          {table1.map((element, index) => (
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
                  View
                </Link>
              </td>
              <td>
                <Link
                  to={`/all-transaction/edit-transaction/${element.id}`}
                  state={element}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="pageno">
        {pageno.map((item) => (
          <button    key={item} className="btn btn-primary page " id={item} onClick={(e) => {
            pagehandler(item - 1);
          }} > Page {item}</button>
         
        ))}
      </div>
    </>
  );
};
