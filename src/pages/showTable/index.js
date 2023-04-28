import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Datatable";
import { Link } from "react-router-dom";
import "../../pages/showTable/css/showTable.css";

export const ShowTable = () => {
  var groupdata1;

  const result1 = localStorage.getItem("Form Value");
  const tabledata1 = JSON.parse(result1);
  var flag = 0;
  const [data, setdata] = useState(tabledata1);
 
  const [Groupby, setGroupby] = useState();
  const [Grp, setGrp] = useState(true);
  const [dataLength, setdataLength] = useState(totalData);
  const [pagecount, setpagecount] = useState();
  const [perPage,setperPage]=useState(4)

  //  let data1=tabledata1[0]
   let data1=data.slice(0,perPage)
   console.log(data1,"data1")

  const [table1, settable1] = useState(data1);

  var totalData = data.length;
  
  
  const [sortData,setsortData]=useState(
    [
      { column:"transactiondate", order:" ", type:'date',},
    {  column:"monthYear",order:"", type:"date",},
    {  column:"transactionType",  order:"", type:"string",},
     {  column:"from",order:"", type:"string",},
     {column:"to", order:"", type:"string",},
     {column:" amount", type:"int",},
     { column:" notes",order:"", type:"string",}
   
    ]
   )

   const [transDate,settranDate]=useState( { column:"transactiondate", order:" ", type:'date',});


// ----------------------------sorting------------------------------------

const dataSort = (list, key, sortType) => {
  return list.sort(
      function (a, b) {
          var x = a[key];
          var y = b[key];
          if (sortType === 'asc') {
              if (key === 'Transaction_Date') {
                  return new Date(x) - new Date(y);
              }
              if (key === 'Month_Year') {
                  return MonthYear.indexOf(x) - MonthYear.indexOf(y);
              }
              if (key === 'Amount') {
                  x = Number(x.replaceAll(',', ''))
                  y = Number(y.replaceAll(',', ''))
                  return ((x < y) ? -1 : (x > y) ? 1 : 0)
              }
              return ((x < y) ? -1 : (x > y) ? 1 : 0)
          } else {
              if (key === 'Transaction_Date') {
                  return new Date(y) - new Date(x);
              } if (key === 'Month_Year') {
                  return MonthYear.indexOf(y) - MonthYear.indexOf(x);
              }
              if (key === 'Amount') {
                  x = Number(x.replaceAll(',', ''))
                  y = Number(y.replaceAll(',', ''))
                  return ((x > y) ? -1 : (x < y) ? 1 : 0)
              }
              return ((x > y) ? -1 : (x < y) ? 1 : 0)
          }
      }
  )

}



          const convertSort = ( listdata,elementName) => {
            if ((isSortClick === 0) || (elementName !== cuurentSortElement)) {
                console.log("ASC - ", elementName);
                const shortedArray = dataSort(listData, elementName, 'asc');
                setAllTransactionData(shortedArray);
                setIsSortClick(1);
                setCuurentSortElement(elementName);
            }
            if ((isSortClick === 1) && (elementName === cuurentSortElement)) {
                console.log('DESC - ', elementName)
                const shortedArray = dataSort(listData, elementName);
                setAllTransactionData(shortedArray);
                setIsSortClick(2);
            }
            if ((isSortClick === 2) && (elementName === cuurentSortElement)) {
                console.log('INIT - ', elementName)
                setAllTransactionData(myData);
                setIsSortClick(0);
            }
        }

 
 
// let count=1;
//   const convertSort = (column) => {

//     let temp = [...table1];

//     let sortdata={...sortData};

//     if(column=="notes"){
 
//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }
//     if(column=="transactionDate"){

//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }

//     if(column=="monthYear"){

//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }
    
//     if(column=="transactionType"){

//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }

//     if(column=="from"){

//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }

//     if(column=="to"){

//       if(count==1){
      
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           count=1;
//         }
//     }

//     if(column=="amount"){

//       // console.log(temp.amount,"amount")
//       if(count==1){
//       console.log('ASC')
//         temp.sort((a, b) => {
//           if (a[column] > b[column]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         count=count+1;
        
//         }
//         if(count==2){
//           console.log('Desc')
//           temp.sort((a, b) => {
//             if (a[column] < b[column]) {
//               return 1;
//             } else {
//               return -1;
//             }
//           });
//           count=count+1;
    
//         }
    
//         if(count==3){
//           console.log('nothing')
//           count=1;
//         }
//     }
 
//     settable1(temp);

    
//       // if(transDate['column']==="transactiondate"){
//       //   let checkOrder=transDate['order']
//       //   console.log(checkOrder)
      

//       //   // console.log(checkOrder,"transactiondate")
//       //   switch(checkOrder){
//       //     case "":
//       //       console.log("nothing")
//       //       settable1(temp);
//       //       checkOrder='Asc';
//       //       settranDate(checkOrder);

      

//       //       break;
//       //     case 'Asc':
//       //       console.log("Asc")
//       //       temp.sort((a, b) => {
//       //         if (a[column] > b[column]) {
//       //            return 1;
//       //          } else {
//       //            return -1;
//       //          }
//       //        });
//       //        settable1(temp);
//       //       checkOrder='Desc';
//       //       settranDate(checkOrder);
//       //       break;
//       //     default:
//       //       console.log("desc")

//       //       temp.sort((a, b) => {
//       //         if (a[column] < b[column]) {
//       //            return 1;
//       //          } else {
//       //            return -1;
//       //          }
//       //        });
//       //        settable1(temp);

//       //         checkOrder=""
//       //         settranDate(checkOrder);
//       //   }
        
//       //   console.log(checkOrder,"check order")
      
//       // }
  
   
    

    
//   };

  function group(event) {
    const grouptype = event.target.value;

    const groupBy = (array, key) => {
      if (key == "Select Fields for Group By") {
        console.log("true hai");
        return "true";
      } else {
        let naresh = array.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          console.log(typeof result);
          return result;
        }, []);
        return naresh;
      }
    };
    const personGroupedByColor = groupBy(data, grouptype);
    console.log(personGroupedByColor);
    if (personGroupedByColor == "true") {
      setGrp(true);
    } else {
      setGroupby(personGroupedByColor);
      setGrp(false);
    }
  }

  // --------------------------Pagination-------------------------------------------
  const pagehandler=(item)=>{
    console.log(item,"item selected")
    let tableData = [...data];
    const offset = item*perPage;
    console.log(offset)
   
  
      const slice = tableData.slice(offset,offset+perPage);
      console.log(slice,"slice data")
      settable1(slice);
    

  }


  let pageNo=Math.ceil(totalData /perPage);
  const pageno=[];
  for(let i=1;i<=pageNo;i++){
   

    pageno.push(i)

  }
  console.log(pageno,"pageno")  


  return (
    <div className="container">
      <div className="sub-container">
        {Grp ? (
          dataLength == 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Transaction Date</th>
                  <th scope="col">Month Year</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col">From Account </th>
                  <th scope="col">To Account </th>
                  <th scope="col">Amount</th>
                  <th scope="col">Receipt</th>
                  <th scope="col">Notes</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>Data Not Found</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="container">

         
            <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    onClick={() => convertSort(data,"Transaction_Date")}
                  >
                    Transaction Date
                  </th>
                  <th scope="col" onClick={() => convertSort(data,"Month_Year")}>
                    Month Year
                  </th>
                  <th
                    scope="col"
                    onClick={() => convertSort(data,"transactionType")}
                  >
                    Transaction Type
                  </th>
                  <th scope="col" onClick={() => convertSort(data,"from")}>
                    From Account
                  </th>
                  <th scope="col" onClick={() => convertSort(data,"to")}>
                    To Account
                  </th>
                  <th scope="col" onClick={() => convertSort(data,"Amount")}>
                    Amount
                  </th>
                  <th scope="col">Receipt</th>
                  <th scope="col" onClick={() => convertSort(data,"notes")}>
                    Notes
                  </th>
                  <th scope="col">View</th>
                </tr>
              </thead>

              <tbody>
                <DataTable data={table1} />
              </tbody>
            </table>
          
  
            </div>
          )
        ) :
         (
          Object.values(Groupby).map((item, index) => (
            <div className="container1">
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
                  {item.map((element, index) => (
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
                        <Link to="/view-transaction" state={element}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>

      <div className="pageno">
              {pageno.map((item)=>(
               <span  key={item} className="page" onClick={(e)=>{pagehandler(item-1)}}>Page {item}</span>
              ))}
            </div>



+


      <div className="sub-container">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={group}
        >
          <option >Select Fields for Group By</option>
          {Object.keys(table1[0]).map((item) => (
            <option  key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
