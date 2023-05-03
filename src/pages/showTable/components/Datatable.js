import React, { useEffect, useState } from "react";
import { View } from "./../../view_transaction";
import { Link } from "react-router-dom";

export const DataTable = (props) => {
  const result = props.data;
  console.log(typeof(result),"dfgfdgdfgdfgdfg")

  const [originalData,setOriginalData]=useState(result)
  console.log(typeof(originalData))

  const [isSortClick, setIsSortClick] = useState(0);
  const [searched,setsearched]=useState(originalData)
  

  // const [dataLength, setdataLength] = useState(totalData);
  // const [pagecount, setpagecount] = useState();
  const [perPage, setperPage] = useState(2);

  const [cuurentSortElement, setCuurentSortElement] = useState();




  const [table1, settable1] = useState([]);
  
  console.log(table1,"table1 data")

  useEffect(()=>{
    let sliceData= searched.slice(0, perPage);
    console.log(sliceData, "data1");
    settable1(sliceData)
  },[searched])

 

  var totalData = searched.length;

  // -------------------Pagination----------------

  const pagehandler = (item) => {   
    console.log(item, "item selected");
    let tableData = [...searched];
    const offset = item * perPage;
    console.log(offset);

    const slice = tableData.slice(offset, offset + perPage);
    console.log(slice, "slice data");
    settable1(slice);
  };

  let pageNo = Math.ceil(totalData / perPage);
  const pageno = [];
  for (let i = 1; i <= pageNo; i++) {
    pageno.push(i);
  }
  console.log(pageno, "pageno");


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
          return x - y;
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
      console.log("ASC - ", elementName);
      const shortedArray = dataSort(listData, elementName, "asc");
      settable1(shortedArray);
      console.log(table1,"Ascending sort")

      setIsSortClick(1);
      setCuurentSortElement(elementName);
    }
    if (isSortClick === 1 && elementName === cuurentSortElement) {
      console.log("DESC - ", elementName);
      const shortedArray = dataSort(listData, elementName);
      settable1(shortedArray);
      console.log(table1,"Descending sort")

      setIsSortClick(2);
    }
    if (isSortClick === 2 && elementName === cuurentSortElement) {
      console.log("INIT - ", elementName);
      setsearched(result);
      console.log(table1,"Without sort")
      setIsSortClick(0);
    }
  };



  // ----------------------------------------searching------------------------------
const searchHandler=()=>{
  const userData={...originalData}
  console.log(userData)

  const searchField=document.querySelector("#search").value
console.log(searchField)

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

console.log(filteredPersons,"searched datat")

setsearched(filteredPersons)

}


  return (
    <>

<div class="input-group">
  <input type="search" id="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary" onClick={searchHandler}>search</button>
</div>

    <div className="container">

      <table className="table">
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => convertSort(table1, "transactionDate")}
            >
              Transaction Date
            </th>
            <th scope="col" onClick={() => convertSort(table1, "monthYear")}>
              Month Year
            </th>
            <th
              scope="col"
              onClick={() => convertSort(table1, "transactionType")}
            >
              Transaction Type
            </th>
            <th scope="col" onClick={() => convertSort(table1, "from")}>
              From Account
            </th>
            <th scope="col" onClick={() => convertSort(table1, "to")}>
              To Account
            </th>
            <th scope="col" onClick={() => convertSort(table1, "amount")}>
              Amount
            </th>
            <th scope="col">Receipt</th>
            <th scope="col" onClick={() => convertSort(table1, "notes")}>
              Notes
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
              <td>{element.receipt.slice(0, 22)}</td>
              <td>{element.notes}</td>
              <td>
                <Link to={`/all-transaction/${index + 1}`} state={element}>
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
          <span
            key={item}
            className="page"
            onClick={(e) => {
              pagehandler(item - 1);
            }}
          >
            Page {item}
          </span>
        ))}
      </div>
    </>
  );
};
