
import React, { useEffect, useState ,useContext} from "react";
import { DataTable } from "../components/Table";
import { Link } from "react-router-dom";
// import {userContext} from "../../contexts/Context"
// import {Navbar} from '../../components/Navbar'

// import  {addTransaction,removeTransaction,editTransaction,viewTransaction} from "../../../redux/stores/slices/transactionSlice";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import "../../../assets/styles/showtable.css";
import {Logout} from '../../authentication/Logout'
import {Navbar} from '../../navbar/Navbar'

export const ShowTable = () => {
  var groupdata1;

//   const result1 = localStorage.getItem("Formnew");

const transactionData = useAppSelector((state) => {
    return state.userTransactions;
  });


 
  useEffect(()=>{
    setdata(transactionData)
  },[transactionData])
 

  var flag = 0;
  const [data, setdata] = useState(transactionData);
  // console.log(data,"show table data")

  const [Groupby, setGroupby] = useState<any>();
  const [Grp, setGrp] = useState(true);

  const LanguageData=useAppSelector((state) => { 
    return state.languageSelection;
  });


  // const [isSortClick,setIsSortClick]=useState(0);

  //  let data1=tabledata1[0]

  // const [sortData, setsortData] = useState([
  //   { column: "transactiondate", order: " ", type: "date" },
  //   { column: "monthYear", order: "", type: "date" },
  //   { column: "transactionType", order: "", type: "string" },
  //   { column: "from", order: "", type: "string" },
  //   { column: "to", order: "", type: "string" },
  //   { column: " amount", type: "int" },
  //   { column: " notes", order: "", type: "string" },
  // ]);

  // const [transDate, settranDate] = useState({
  //   column: "transactiondate",
  //   order: " ",
  //   type: "date",
  // });

  
// -----------------------------------------Groupby--------------------------------------------------
  function group(event:React.ChangeEvent<HTMLSelectElement>) {
    const grouptype = event.target.value;

    
    const groupBy = (array:String[], key:any) => {
      if (key == "Select Fields for Group By") {
        // console.log("true hai");
        return "true";
      } else {

        // type ReduceReturnType = Record<string, string>;
        let naresh = array.reduce((result:any, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          // console.log(result, "initial value");
          return result;
        }, []);
        return naresh;
      }
    };
    const personGroupedByColor = groupBy(data, grouptype);
    // console.log(personGroupedByColor);
    if (personGroupedByColor == "true") {
      setGrp(true);
    } else {
      setGroupby(personGroupedByColor);
      setGrp(false);
    }
  }

  // --------------------------Pagination-------------------------------------------

  // console.log(Groupby,"grouphsdfihdhf =---------------------")
  return (
<>
<Navbar/>
<div className="logout">
<Logout lang={LanguageData['logout']}/>

</div>

{  
    data.length<=0?
    <div className="container">
    <div className="sub-container1">
    {LanguageData['datanotfound']}
        </div>
        </div>
        :
        <>
      

    <div className="container">
    <div className="sub-container1">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={(e)=>{group(e)}}
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
                  <th scope="col">{LanguageData['transactionDate']}</th>
                  <th scope="col">  {LanguageData['monthYear']}</th>
                  <th scope="col">  {LanguageData['transactionType']}</th>
                  <th scope="col"> {LanguageData['from']} </th>
                  <th scope="col"> {LanguageData['to']} </th>
                  <th scope="col">{LanguageData['amount']}</th>
                  <th scope="col"> {LanguageData['receipt']}</th>
                  <th scope="col">  {LanguageData['notes']}</th>
                  <th scope="col">{LanguageData['view']}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>{LanguageData['datanotfound']}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="container">
     

              <DataTable data={data} />
            </div>
          )
        ) : (
          Object.keys(Groupby)?.map((item, index) => (
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
}


    </>
  );
};
