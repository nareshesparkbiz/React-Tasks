import React, { useEffect }  from "react";
import {View} from './../../view_transaction'
import {Link} from 'react-router-dom'

export const DataTable=(props)=>{
    const result=props.data;
    console.log(result,"sdfsdfsdfsdsdfsd")
    // useEffect(()=>{

    // },[result])


return(
  result.map((element,index)=>(
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
  
)
}