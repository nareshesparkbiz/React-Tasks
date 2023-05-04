import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Datatable";
import { Link } from "react-router-dom";
import "../../pages/showTable/css/showTable.css";
import {Logout} from '../../pages/logout/component/Logout'

export const ShowTable = () => {
  var groupdata1;

  const result1 = localStorage.getItem("Formnew");

  const tabledata1 = JSON.parse(result1);
  var flag = 0;
  const [data, setdata] = useState(tabledata1);

  const [Groupby, setGroupby] = useState();
  const [Grp, setGrp] = useState(true);



  // const [isSortClick,setIsSortClick]=useState(0);

  //  let data1=tabledata1[0]

  const [sortData, setsortData] = useState([
    { column: "transactiondate", order: " ", type: "date" },
    { column: "monthYear", order: "", type: "date" },
    { column: "transactionType", order: "", type: "string" },
    { column: "from", order: "", type: "string" },
    { column: "to", order: "", type: "string" },
    { column: " amount", type: "int" },
    { column: " notes", order: "", type: "string" },
  ]);

  const [transDate, settranDate] = useState({
    column: "transactiondate",
    order: " ",
    type: "date",
  });

  // ----------------------------sorting------------------------------------

  // let count=1;
  //   const convertSort = (data,column) => {

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

  // if(transDate['column']==="transactiondate"){
  //   let checkOrder=transDate['order']
  //   console.log(checkOrder)

  //   // console.log(checkOrder,"transactiondate")
  //   switch(checkOrder){
  //     case "":
  //       console.log("nothing")
  //       settable1(temp);
  //       checkOrder='Asc';
  //       settranDate(checkOrder);

  //       break;
  //     case 'Asc':
  //       console.log("Asc")
  //       temp.sort((a, b) => {
  //         if (a[column] > b[column]) {
  //            return 1;
  //          } else {
  //            return -1;
  //          }
  //        });
  //        settable1(temp);
  //       checkOrder='Desc';
  //       settranDate(checkOrder);
  //       break;
  //     default:
  //       console.log("desc")

  //       temp.sort((a, b) => {
  //         if (a[column] < b[column]) {
  //            return 1;
  //          } else {
  //            return -1;
  //          }
  //        });
  //        settable1(temp);

  //         checkOrder=""
  //         settranDate(checkOrder);
  //   }

  //   console.log(checkOrder,"check order")

  // }

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
          console.log(result, "initial value");
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

  console.log(Groupby,"grouphsdfihdhf =---------------------")
  return (
<>
<div className="logout">
<Logout/>

</div>

    <div className="container">
    <div className="sub-container1">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={group}
        >
          <option>Select Fields for Group By</option>
          {Object.keys(data[0]).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>


      <div className="sub-container">
        {Grp ? (
          data.length == 0 ? (
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
     

              <DataTable data={data} />
            </div>
          )
        ) : (
          Object.keys(Groupby).map((item, index) => (
            <>
            {console.log(Groupby[item],'item-----------------fcgvfvbgfdgbdfgh-------------------')},
            <div className="container1">
              <DataTable data={Groupby[item]} />
            </div>
            </>
          ))
        )}
      </div>
      
     
    </div>

    </>
  );
};
