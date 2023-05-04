import React, { useEffect, useState } from "react";
import { View } from "./../../view_transaction";
import { Link } from "react-router-dom";
import '.././css/showTable.css'

export const DataTable = ({data}) => {
  console.log({data})


 const[data123,setdata123]=useState(data)
 console.log(data123,"setdata1")

  const [originalData,setOriginalData]=useState(data);
  // setOriginalData(result)
  console.log({ originalData })
  useEffect(()=> {
    console.log('result called');

  
  },[originalData])
  

  // console.log(typeof(result),"dfgfdgdfgdfgdfg")


// console.log(data,"data hai")
// console.log(result,"result data hai")

 
  // console.log(originalData,"set original data hai")

  const [isSortClick, setIsSortClick] = useState(0);
  const [searched,setsearched]=useState(originalData)
  

  // const [dataLength, setdataLength] = useState(totalData);
  // const [pagecount, setpagecount] = useState();
  const [perPage, setperPage] = useState(2);

  const [cuurentSortElement, setCuurentSortElement] = useState();




  const [table1, settable1] = useState([]);
  
  // console.log(table1,"table1 data")

  useEffect(()=>{
   
    let sliceData= searched.slice(0, perPage);
    // console.log(sliceData, "data1");
    settable1(sliceData)
  },[searched,data])

 

  var totalData = searched.length;

  // -------------------Pagination----------------

  const pagehandler = (item) => {   
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
          x = Number(x.replaceAll(",", ""));
          y = Number(y.replaceAll(",", ""));
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
          x = Number(x.replaceAll(",", ""));
          y = Number(y.replaceAll(",", ""));
          return x > y ? -1 : x < y ? 1 : 0;
        }
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  };

  const convertSort = (listData, elementName) => {
    if (isSortClick === 0 || elementName !== cuurentSortElement) {
      // console.log("ASC - ", elementName);
      const shortedArray = dataSort(listData, elementName, "asc");
      setsearched(shortedArray);

      document.querySelector('#'+elementName).innerHTML="↑"
      // console.log(table1,"Ascending sort")

      setIsSortClick(1);
      setCuurentSortElement(elementName);
    }
    if (isSortClick === 1 && elementName === cuurentSortElement) {
      // console.log("DESC - ", elementName);
      const shortedArray = dataSort(listData, elementName);
      setsearched(shortedArray);
      // console.log(table1,"Descending sort")
      document.querySelector('#'+elementName).innerHTML="↓"

      setIsSortClick(2);
    }
    if (isSortClick === 2 && elementName === cuurentSortElement) {
      // console.log("INIT - ", elementName);
      setsearched(data);
      // console.log(table1,"Without sort")
      document.querySelector('#'+elementName).innerHTML=""
      setIsSortClick(0);
    }
    
  };



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
              <td>{element.amount}</td>
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
          <button    key={item} className="btn btn-primary page"  onClick={(e) => {
            pagehandler(item - 1);
          }} > Page {item}</button>
         
        ))}
      </div>
    </>
  );
};
