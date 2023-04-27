import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Datatable";
import { Link } from "react-router-dom";

export const ShowTable = () => {
  var groupdata1;
  const result1 = localStorage.getItem("Form Value");
  const tabledata1 = JSON.parse(result1);
  var flag=0;

  const [table1, settable1] = useState(tabledata1);
   const [Groupby,setGroupby]=useState()
   const [Grp,setGrp]=useState(true)

  const convertAsc = (column,click) => {
    let temp = [...table1];
    
    temp.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1;
      } else {
        return -1;
      }
    });
    settable1(temp);
    // console.log(tabledata1)
  };



  function group(event) {

    const grouptype = event.target.value;

    const groupBy = (array, key) => {


        let sanjay = array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, []);
        return sanjay;
    };
    const personGroupedByColor = groupBy(table1, grouptype);
    console.log(personGroupedByColor )
    setGroupby(personGroupedByColor);
    setGrp(false)
}










  return (

    <div className="container">
      <div className="sub-container">
 {   Grp? 
     <table className="table">
     <thead>
       <tr>
         <th scope="col" onClick={()=>convertAsc('transactionDate',1)}>
         Transaction Date
         </th>
         <th scope="col"onClick={()=>convertAsc('monthYear',1)} >Month Year</th>
         <th scope="col" onClick={()=>convertAsc('transactionType',1)}>Transaction Type</th>
         <th scope="col" onClick={()=>convertAsc('from',1)}>From Account</th>
         <th scope="col" onClick={()=>convertAsc('to',1)}>To Account</th>
         <th scope="col" onClick={()=>convertAsc('amount',1)}>Amount</th>
         <th scope="col">Receipt</th>
         <th scope='col' onClick={()=>convertAsc('notes',1)}>Notes</th>
         <th scope="col">View</th>
       </tr>
     </thead>
     <tbody>

       <DataTable data={table1}/>
     </tbody>
   </table>

   :
   Groupby.map((item,index)=>(
    
    <div className="container">
    
    <table className="table" key={index}>
      <thead>
        <tr>
          <th>Transaction Date</th>
          <th>Month Year</th>
          <th>Transaction Type</th>
          <th>From Account</th>
          <th>To Account</th>
          <th>Amount</th>
          <th>Receipt</th>
          <th>Aa Notes</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {item.map((element,index)=>(
          <tr key={index}>
          <td>{element.transactionDate}</td>
          <td>{element.monthYear}</td>
          <td>{element.transactionType}</td>
          <td>{element.from}</td>
          <td>{element.to}</td>
          <td>{element.amount}</td>
          <td>{element.receipt.slice(0,22)}</td>
          <td>{element.notes}</td>
          <td><Link to="/view-transaction" state={element} >View</Link></td>

      </tr>
        )) 
      
           }
      </tbody>
    </table>

    </div>
   ))
   



 }
     
    
      </div>
  
   <div className="sub-container">
   <select
              class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={group}
            >
              <option selected>Select Fields for Group By</option>
              { Object.keys(table1[0]).map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>

  
   </div>
    </div>


  );
};
