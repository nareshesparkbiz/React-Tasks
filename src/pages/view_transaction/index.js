 import React, { useEffect, useState }  from "react";
import { useLocation, useParams } from "react-router-dom";
 export const View=()=>{
 const location=useLocation();
 const data=location.state;


 const {id}=useParams();


const [zoomin,setzoomin]=useState({
    height:100,
    width:100,
})

const [zoomout,setzoomout]=useState({
    height:100,
    width:100,
});
 const zoomIn=()=>{
    
    let image1=document.querySelector('.imageTag');
    let height1=50;
    let width1=50;
    let newHeigth=zoomin.height+height1;
    let newwidth=zoomin.width+width1;
    console.log(zoomin,"previous")
    console.log(newHeigth,newwidth)
    if(newHeigth>=100 && newwidth>=100){
        document.querySelector('.but2').style. visibility='visible';
    }
    setzoomin((prev)=>({...prev, height:newHeigth ,width:newwidth}))
    console.log(zoomin,"next")


    image1.style.height=zoomin['height']+"px"
    image1.style.width=zoomin['width']+"px"



 }
 useEffect(()=>{

 },[zoomin])


 useEffect(()=>{

 },[zoomout])

 const zoomOut=()=>{
    
    let image1=document.querySelector('.imageTag');
    let height1=50;
    let width1=50;
    let newHeigth=zoomin.height - height1;
    let newwidth=zoomin.width - width1;
    console.log(zoomout,"previous")
    console.log(newHeigth,newwidth)
    if(newHeigth>=100 && newwidth>=100){

        setzoomout((prev)=>({...prev, height:newHeigth ,width:newwidth}))
        setzoomin((prev)=>({...prev, height:newHeigth ,width:newwidth}))
        console.log(zoomout,"next")
    }
    else{
        console.log("sdfbhsdbfhsdfsdfsdfsdf")
document.querySelector('.but2').style. visibility='hidden';
    }


    image1.style.height=zoomout['height']+"px"
    image1.style.width=zoomout['width']+"px"

 }

    return(
    <div className="container">
        <div className="subcontainer">
            <table>
                <tbody>
                    <tr>
                        <th>Transaction ID</th>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                    <th>Transaction Date:</th>
                    <td>{data.transactionDate}</td>
                    </tr>
                    <tr>             
                    <th>Transaction Type:</th>
                    <td>{data.transactionType}</td>
                    </tr>
                    <tr>             
                    <th>Month Year:</th>
                    <td>{data.monthYear}</td>
                    </tr>
                    <tr>             
                    <th>From Account:</th>
                    <td>{data.from}</td>
                    </tr>
                    <tr>             
                    <th>To Account:</th>
                    <td>{data.to}</td>
                    </tr>
                    <tr>             
                    <th>Amount:</th>
                    <td>{data.amount}</td>
                    </tr>
                    <tr>
                        <th>Receipt:</th>
                        
                        <td><img src={data.receipt} alt="receipt" className="imageTag"  height={100} width={100} /></td>
                    </tr>
                    <tr>
                        <td><span  onClick={zoomIn} className="but1">Zoom in </span></td>
                        <td><span  onClick={zoomOut} className="but2">Zoom Out </span></td>

                    </tr>

                </tbody>
            </table>
        </div>
    </div>
        
    
    )
 }