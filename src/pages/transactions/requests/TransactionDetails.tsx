import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

import { TransactionType } from "../../../model/type";
import { useAppSelector } from "../../../redux/hooks";

export const ShowTransaction = () => {
  const location = useLocation();
  const { id } = useParams();

  const transactionData = useAppSelector((state) => {
    return state.userTransactions;
  });

  const LanguageData = useAppSelector((state) => {
    return state.languageSelection;
  });

  const [currentuser, setcurrentUser] = useState<TransactionType | any>({});

  const [zoomin, setzoomin] = useState<{ height: number; width: number }>({
    height: 100,
    width: 100,
  });

  const [zoomout, setzoomout] = useState<{ height: number; width: number }>({
    height: 100,
    width: 100,
  });

  const imgZoomOut = document.querySelector(
    ".zoom-out"
  ) as HTMLImageElement | null;

  useEffect(() => {
    const userData = [...transactionData];
    for (let i in userData) {
      if (Number(id) == userData[i].id) {
        setcurrentUser(userData[i]);
      }
    }

    const imgZoomOut = document.querySelector(
      ".zoom-out"
    ) as HTMLImageElement | null;

    const imgZoomInIt = document.querySelector(
      ".zoom-init"
    ) as HTMLImageElement | null;
    const imgZoom = document.querySelector(".zoom") as HTMLImageElement | null;

    var zoom = 1;
    if (imgZoom !== null) {
      imgZoom.addEventListener("onclick", () => {
        zoom += 0.1;
        const target: any = document.getElementsByClassName(".target");
        target.style.transform = "scale(" + zoom + ")";
      });
    }

    if (imgZoomInIt !== null) {
      imgZoomInIt.addEventListener("onclick", () => {
        zoom = 1;
        const target: any = document.getElementsByClassName(".target");
        target.style.transform = "scale(" + zoom + ")";
      });
    }

    if (imgZoomOut !== null) {
      imgZoomOut.addEventListener("onclick", () => {
        zoom -= 0.1;
        const target: any = document.getElementsByClassName(".target");
        target.style.transform = "scale(" + zoom + ")";
      });
    }
  }, []);

  useEffect(() => {
    console.warn("zoom in " + zoomin);
  }, [zoomin]);

  useEffect(() => {
    console.warn("zoom out " + zoomout);
  }, [zoomout]);

  const zoomIn = () => {
    let image1: any = document.querySelector(".imageTag");
    let height1 = 50;
    let width1 = 50;
    let newHeigth = zoomin.height + height1;
    let newwidth = zoomin.width + width1;
 
    if (newHeigth >= 100 && newwidth >= 100) {
      if (imgZoomOut !== null) {
        imgZoomOut.style.visibility = "visible";
      }
    }
    setzoomin((prev) => ({ ...prev, height: newHeigth, width: newwidth }));
  

    image1.style.height = zoomin["height"] + "px";
    image1.style.width = zoomin["width"] + "px";
  };

  const zoomOut = () => {
    let image1: any = document.querySelector(".imageTag");
    let height1 = 50;
    let width1 = 50;
    let newHeigth = zoomin.height - height1;
    let newwidth = zoomin.width - width1;

    if (newHeigth >= 100 && newwidth >= 100) {
      setzoomout((prev) => ({ ...prev, height: newHeigth, width: newwidth }));
      setzoomin((prev) => ({ ...prev, height: newHeigth, width: newwidth }));
    } else {
      if (imgZoomOut !== null) {
        imgZoomOut.style.visibility = "hidden";
      }
    }

    image1.style.height = zoomout["height"] + "px";
    image1.style.width = zoomout["width"] + "px";
  };

  return (
    <div className="container">
      <div className="subcontainer">
        <table>
          <tbody>
            <tr className="viewTr">
              <th> {LanguageData["transactionId"]}: </th>
              <td>{currentuser.id}</td>
            </tr>
            <tr className="viewTr">
              <th> {LanguageData["transactionDate"]} :</th>
              <td>{currentuser.transactionDate}</td>
            </tr>
            <tr className="viewTr">
              <th> {LanguageData["transactionType"]}:</th>
              <td>{currentuser.transactionType}</td>
            </tr>
            <tr className="viewTr">
              <th> {LanguageData["monthYear"]}:</th>
              <td>{currentuser.monthYear}</td>
            </tr>
            <tr className="viewTr">
              <th> {LanguageData["from"]} :</th>
              <td>{currentuser.from}</td>
            </tr>
            <tr className="viewTr">
              <th> {LanguageData["to"]} :</th>
              <td>{currentuser.to}</td>
            </tr>
            <tr className="viewTr">
              <th>{LanguageData["amount"]} :</th>
              <td>{currentuser.amount}</td>
            </tr>
            <tr className="viewTr">
              <th>{LanguageData["receipt"]}:</th>

              <td>
                <img
                  src={currentuser.receipt}
                  alt="receipt"
                  className="imageTag box target"
                  height={100}
                  width={100}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP"
        />

        <a className="btn zoom" onClick={zoomIn}>
          <i className="fas fa-search-plus"></i>
        </a>
        <a className="btn zoom-out" onClick={zoomOut}>
          <i className="fas fa-search-minus"></i>
        </a>
        <a className="btn zoom-init">
          <i className="fas fa-recycle"></i>
        </a>
      </div>
      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
        <button>
          <Link to="/all-transaction">{LanguageData["backToTrans"]}</Link>{" "}
        </button>
      </div>
    </div>
  );
};
