import { useEffect, useState } from "react";

import { DataTable } from "../components/Table";
import { useAppSelector } from "../../../redux/hooks";
import { Logout } from "../../authentication/Logout";
import { Navbar } from "../../navbar/Navbar";
import "../../../assets/styles/showtable.css";
import { TransactionType } from "../../../model/type";

export const ShowTable = () => {
  const transactionData = useAppSelector((state) => {
    return state.userTransactions;
  });
  
    const LanguageData = useAppSelector((state) => {
      return state.languageSelection;
    });


  const [data, setdata] = useState<TransactionType[]>([]);
  const [Groupby, setGroupby] = useState<any>({});
  const [grptype, setGrpType] = useState<string>('');


  useEffect(()=>{
    setdata(transactionData)
  },[transactionData])

  
  useEffect(() => {
    let temp = [...transactionData];

    let result: { [key: string]: any } = {};

    if (grptype) {
      temp.forEach((item) => {
        const value = item[grptype];

        result[value] = result[value] ?? [];
        result[value].push(item);
      });
    }

    setGroupby(result);
  }, [grptype, transactionData]);

  
  
  return (
    <>
      <Navbar />
      <div className="logout">
        <Logout lang={LanguageData["logout"]} />
      </div>

      {data.length <= 0 ? (
        <div className="container">
          <div className="sub-container1">{LanguageData["datanotfound"]}</div>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="sub-container1">
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => setGrpType(e.target.value)}
              >
                <option value={''}>Select Fields for Group By</option>
                {Object.keys(data[0]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="sub-container">
              {grptype && Object.keys(Groupby).length !== 0 ? (
                Object.keys(Groupby)?.map((item, index) => (
                  <>
                  <h1>{item}</h1>
                    <div className="container1">
                      <DataTable data={Groupby[item]} />
                    </div>
                  </>
                ))
              ) : data.length === 0 ? (
                <h1>Data not found</h1>
              ) : (
                <div className="container">
                  <DataTable data={data} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
