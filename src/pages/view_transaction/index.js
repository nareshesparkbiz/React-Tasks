 import React, { useEffect, useState }  from "react";
import { useLocation, useParams } from "react-router-dom";

import './css/index.css'
 export const View=()=>{
 const location=useLocation();
 const data=location.state;


useEffect(()=>{
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
    // $('.zoom').on('click', function(){
    //     zoom += 0.1;
    //     $('.target').css('transform', 'scale(' + zoom + ')');
    // });
    // $('.zoom-init').on('click', function(){
    //     zoom = 1;
    //     $('.target').css('transform', 'scale(' + zoom + ')');
    // });
    // $('.zoom-out').on('click', function(){
    //     zoom -= 0.1;
    //     $('.target').css('transform', 'scale(' + zoom + ')');
    // });
},[])
 

 const {id}=useParams();


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
    console.log(zoomin,"previous")
    console.log(newHeigth,newwidth)
    if(newHeigth>=100 && newwidth>=100){
        document.querySelector('.zoom-out').style. visibility='visible';
    }
    setzoomin((prev)=>({...prev, height:newHeigth ,width:newwidth}))
    console.log(zoomin,"next")


    image1.style.height=zoomin['height']+"px"
    image1.style.width=zoomin['width']+"px"



 }


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
                        <td>{data.id}</td>
                    </tr>
                    <tr className="viewTr">
                    <th>Transaction Date:</th>
                    <td>{data.transactionDate}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Transaction Type:</th>
                    <td>{data.transactionType}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Month Year:</th>
                    <td>{data.monthYear}</td>
                    </tr >
                    <tr className="viewTr">             
                    <th>From Account:</th>
                    <td>{data.from}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>To Account:</th>
                    <td>{data.to}</td>
                    </tr>
                    <tr className="viewTr">             
                    <th>Amount:</th>
                    <td>{data.amount}</td>
                    </tr>
                    <tr className="viewTr">
                        <th>Receipt:</th>
                        
                        <td ><img src={data.receipt} alt="receipt" className="imageTag box target"  height={100} width={100} /></td>
                    </tr>
                   

                </tbody>
            </table>

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"/>

<a class="btn zoom" onClick={zoomIn}><i class="fas fa-search-plus"></i></a>
<a class="btn zoom-out"  onClick={zoomOut} ><i class="fas fa-search-minus"></i></a>
<a class="btn zoom-init"><i class="fas fa-recycle"></i></a>
        </div>
    </div>
        
    
    )
 }