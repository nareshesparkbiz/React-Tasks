import React, { useEffect, useState }  from "react";
import { useLocation, useParams,Link } from "react-router-dom";
// import {userContext} from "../../contexts/Context"
import { useSelector } from "react-redux";


// import './css/index.css'


 export const ShowTransaction=()=>{
 const location=useLocation();

 const transactionData = useSelector((state) => {
    return state.userTransactions;
  });

 const [currentuser,setcurrentUser]=useState("");
 const {id}=useParams();
//  const {transaction1,settransaction1}= useContext(userContext)


useEffect(()=>{
    // const localData=localStorage.getItem('Formnew');
    const userData=[...transactionData]
    for(let i in userData){
        if(id==userData[i].id){

            setcurrentUser(userData[i])
        }
    }






    var zoom = 1;
		
    document.querySelector('.zoom').addEventListener('onclick', ()=>{
        zoom+=0.1;
        document.getElementsByClassName('.target').style.transform='scale('+zoom+')';
    });
    document.querySelector('.zoom-init').addEventListener('onclick', ()=>{
        zoom=1;
        document.getElementsByClassName('.target').style.transform='scale('+zoom+')';
    });

    document.querySelector('.zoom-out').addEventListener('onclick', ()=>{
        zoom-=0.1;
        document.getElementsByClassName('.target').style.transform='scale('+zoom+')';
    });
   
},[])
 

// console.log(currentuser,"--------------------------------------current user--------------------------------")



const [zoomin,setzoomin]=useState({
    height:100,
    width:100,
})


useEffect(()=>{
console.warn("zoom in "+zoomin)
},[zoomin])


const [zoomout,setzoomout]=useState({
    height:100,
    width:100,
});


useEffect(()=>{
    console.warn("zoom out "+zoomout)

},[zoomout])

 const zoomIn=()=>{
    
    let image1=document.querySelector('.imageTag');
    let height1=50;
    let width1=50;
    let newHeigth=zoomin.height+height1;
    let newwidth=zoomin.width+width1;
    // console.log(zoomin,"previous")
    // console.log(newHeigth,newwidth)
    if(newHeigth>=100 && newwidth>=100){
        document.querySelector('.zoom-out').style. visibility='visible';
    }
    setzoomin((prev)=>({...prev, height:newHeigth ,width:newwidth}))
    // console.log(zoomin,"next")


    image1.style.height=zoomin['height']+"px"
    image1.style.width=zoomin['width']+"px"



 }


 const zoomOut=()=>{
    
    let image1=document.querySelector('.imageTag');
    let height1=50;
    let width1=50;
    let newHeigth=zoomin.height - height1;
    let newwidth=zoomin.width - width1;
    // console.log(zoomout,"previous")
    // console.log(newHeigth,newwidth)
    if(newHeigth>=100 && newwidth>=100){

        setzoomout((prev)=>({...prev, height:newHeigth ,width:newwidth}))
        setzoomin((prev)=>({...prev, height:newHeigth ,width:newwidth}))
        // console.log(zoomout,"next")
    }
    else{
        // console.log("sdfbhsdbfhsdfsdfsdfsdf")
document.querySelector('.zoom-out').style. visibility='hidden';
    }


    image1.style.height=zoomout['height']+"px"
    image1.style.width=zoomout['width']+"px"

 }

    return(
    <div className="container">
        <div className="subcontainer">
            <table>
                <tbody>
                    <tr className="viewTr">
                        <th>Transaction ID</th>
                        <td>{currentuser.id}</td>
                    </tr>
                    <tr className="viewTr">
                    <th>Transaction Date:</th>
                    <td>{currentuser.transactionDate}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Transaction Type:</th>
                    <td>{currentuser.transactionType}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Month Year:</th>
                    <td>{currentuser.monthYear}</td>
                    </tr >
                    <tr className="viewTr">             
                    <th>From Account:</th>
                    <td>{currentuser.from}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>To Account:</th>
                    <td>{currentuser.to}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Amount:</th>
                    <td>{currentuser.amount}</td>
                    </tr>
                    <tr className="viewTr">
                        <th>Receipt:</th>
                        
                        <td ><img src={currentuser.receipt} alt="receipt" className="imageTag box target"  height={100} width={100} /></td>
                    </tr>
                   

                </tbody>
            </table>

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"/>

<a class="btn zoom" onClick={zoomIn}><i class="fas fa-search-plus"></i></a>
<a class="btn zoom-out"  onClick={zoomOut} ><i class="fas fa-search-minus"></i></a>
<a class="btn zoom-init"><i class="fas fa-recycle"></i></a>
        </div>
        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        
         <button><Link to="/all-transaction/view-transaction">Back To Transaction page</Link> </button>                
        </div>
    </div>

    

    
        
    
    )
 }