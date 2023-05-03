

import React from 'react';
import { Link } from 'react-router-dom';

export const Logout=()=>{

    

const yesHandler=()=>{

    let localdata=localStorage.getItem('user-data');
    let userData=JSON.parse(localdata);

    for(let i in userData){
        if(userData[i].status==true){
            userData[i].status=false;
            localStorage.setItem('user-data', JSON.stringify(userData));
            alert('You are successfully logged out')
            return(
                <Link to="login"/>
            )
          
        }
    }


}
const noHandler=()=>{

     alert("Ok ")
}

    return(

        <div>
            <p>
                Do You Really want To Log Out ?.....
            </p>
            <button onClick={yesHandler()}>Yes</button>
            <button onClick={noHandler()}>No</button>
        </div>
    )
}