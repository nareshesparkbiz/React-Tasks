import React, { useEffect }  from "react";
import {View} from './../../view_transaction'
import {Link} from 'react-router-dom'

export const DataTable=(props)=>{
    const result=props.data;
   

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
            <td><Link to={`/all-transaction/${index+1}`} state={element} >View</Link></td>

        </tr>
    ))  
  
)
}