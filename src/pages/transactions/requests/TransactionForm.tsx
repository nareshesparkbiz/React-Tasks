import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import {
  monthYear,
  transactionType,
  fromAccount,
} from "../../../utils/constants";
import { convertImage } from "../../../utils/helper";
import { transactionFormSchema } from "../../../validations/validation";
import "../../../assets/styles/transactionForm.css";
import {
  addTransaction,
  editTransaction,
} from "../../../redux/stores/slices/transactionSlice";
import { useAppSelector } from "../../../redux/hooks";
import { Navbar } from "../../navbar/Navbar";
import { notify } from "../../../utils/helper";
import FormField from "../../../components/FormFiels";
import { TransactionType } from "../../../model/type";

export const AddTransaction = () => {
  var date1 = new Date();
  var year = date1.getFullYear();

  const { id } = useParams(); // Params
  const navigate = useNavigate(); //Navigation

  //Selector
  const transactionData = useAppSelector((state) => {
    return state.userTransactions;
  });

  const selectLanguageData = useAppSelector((state) => {
    return state.languageSelection;
  });

  const dispatch = useDispatch(); // dispatch

  const [currentLang, setCurrentlang] = useState<{ [key: string]: any }>(
    selectLanguageData
  );
  const [currentuser, setcurrentUser] = useState<{ [key: string]: any }>({});
  const [imgstate, setImg] = useState("");

  useEffect(() => {
    setCurrentlang(selectLanguageData);
  }, [selectLanguageData]);

  useEffect(() => {
    if (id != undefined) {
      const userData = [...transactionData];
      for (let i in userData) {
        if (Number(id) == userData[i].id) {
          setcurrentUser(userData[i]);
          for (let j in userData[i]) {
            setValue(j, userData[i][j]);
            if (j === "receipt") {
              setImg(userData[i][j]);
            }
          }
        }
      }
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(transactionFormSchema),
    mode: "all",
  });

  const formhandler = handleSubmit(async (data) => {
    const newTransaction = [...transactionData];

    if (typeof data.receipt !== "string") {
      data.receipt = await convertImage(data.receipt[0]);
    }

    var dateString = new Date(
      data.transactionDate.getTime() -
        data.transactionDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    data.transactionDate = dateString;

    if (newTransaction.length > 0) {
      if (id == undefined) {
        let previd:any = transactionData?.at(transactionData?.length - 1)?.id;
        data["id"] = previd + 1;

        dispatch(addTransaction(data));
        notify("Transaction Add Succefully");
      } else {
        dispatch(editTransaction(data));
        notify("Transaction Update Succefully");
      }
    } else {
      data["id"] = 1;
      dispatch(addTransaction(data));
      notify("Transaction Add Succefully");
    }
    reset();
    setTimeout(() => {
      navigate("/all-transaction");
    }, 2000);
  });

  const removeFile = () => {
    setValue("receipt", "");
    setImg("");
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="subcontainer">
          {id == undefined ? "" : <h1>{currentLang["editForm"]}</h1>}
          <h2 className="header-h2">{currentLang["financetracker"]}</h2>

          <form onSubmit={formhandler}>
            {FormField(
              "transactionDate",
              "Date",
              currentLang["transactionDate"],
              [register, errors]
            )}
            <div className="mb-3">
              <label htmlFor="Month Year" className="form-label">
                Month Year
              </label>
              <select
                className="form-select"
                {...register("monthYear", { required: true })}
                aria-label="Default select example"
              >
                <option value={""}>Select MonthYear</option>

                {monthYear?.map((item: string, index: number) => {
                  return (
                    <option key={item} value={index}>
                      {item}
                      {year}
                    </option>
                  );
                })}
              </select>
              <div className="form-text  text-danger ">
                {errors.monthYear?.message?.toString()}
              </div>
            </div>

            {FormField(
              "transactionType",
              "select",
              currentLang["transactionType"],
              [register, errors],
              "",
              transactionType
            )}

            {FormField(
              "from",
              "select",
              currentLang["from"],
              [register, errors],
              "",
              fromAccount
            )}

            {FormField(
              "to",
              "select",
              currentLang["to"],
              [register, errors],
              "",
              fromAccount
            )}

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                {currentLang["amount"]}
              </label>

              <div className="input-group mb-3">
                <span className="input-group-text"> {currentLang["Rs"]}</span>
                <input
                  type="text"
                  className="form-control"
                  {...register("amount")}
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </div>
              <div className="form-text text-danger">
                {errors.amount?.message?.toString()}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="receipt" className="form-label">
                {currentLang["receipt"]}
              </label>

              {imgstate ? (
                <div className=" text-danger">
                  <img src={imgstate} height="200" alt="" />
                  <span className="crossButton" onClick={() => removeFile()}>
                    X
                  </span>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="imagefile"
                    {...register("receipt", {
                      onChange: async (e) => {
                        let file :any= await convertImage(e.target.files[0]);

                        console.log(file);

                        setImg(file);
                      },
                    })}
                    className="form-control"
                  />
                </>
              )}

              <div className="form-text text-danger">
                {errors.receipt?.message?.toString()}
              </div>
            </div>

            {FormField(
              "notes",
              "textarea",
              currentLang["notes"],
              [register, errors],
              "Notes"
            )}

            <div className="text-center">
              <button type="submit" className="btn btn-success center">
                {currentLang["submit"]}{" "}
              </button>
            </div>
          </form>
        </div>
        <div className="toast-container">
          {" "}
          <ToastContainer
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
          />
        </div>
      </div>
    </>
  );
};
