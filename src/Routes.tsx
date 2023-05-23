import {Routes,Route, createBrowserRouter, createRoutesFromElements, RouterProvider,Navigate} from 'react-router-dom';
// import { JsxElement } from 'typescript';
import Register from './pages/authentication/Register'
import {Login} from './pages/authentication/Login'
import { AddTransaction } from './pages/transactions/requests/TransactionForm';
import { ShowTable } from './pages/transactions/requests/Transactions';
import { ShowTransaction } from './pages/transactions/requests/TransactionDetails'
// import {User} from './components/User'


export const  PublicRoutes=()=>{


    interface finalRouteProps{
        cmp: React.ReactNode,
        isPublic?:boolean,
    }

    const FinalRoute=(props:finalRouteProps):any=>{
        const token=document.cookie;
        if(token!==null){
            // console.log("dasdasdas657999999999999999999999999999")
        }
        // console.log(typeof(token),"token--------------------------")
    const {isPublic,cmp} = props;
    
        if(isPublic){
            // console.log("public")
            if(token){
                return <Navigate to="/all-transaction/view-transaction"/>
               
            }
            else{
                return cmp
                }
        }
        else{
            // console.log("private")
    
            if(token){
                return cmp;
                
            }
            else{
                return <Navigate to="/login" />
            }
        }
       
       
    }



    const router=createBrowserRouter(
  

        createRoutesFromElements(
           
            <Route path="/">
               <Route path="register" element={<FinalRoute  isPublic cmp={<Register/>}/>}/>
            <Route path="login" element={<FinalRoute isPublic cmp={<Login/>}/>}/>
            {/* <Route path="/user" element={<User name={"jayesh"}/>}/>  */}
          
          


             <Route path="/all-transaction">

            <Route path="add-transaction" element={<FinalRoute  cmp={<AddTransaction/>}/>}/>
            <Route path="view-transaction" element={<FinalRoute cmp={<ShowTable/>}/>}/>
            <Route path=':id' element={<FinalRoute   cmp={<ShowTransaction/>}/>}/>
            <Route path="edit-transaction/:id" element={<FinalRoute  cmp={<AddTransaction/>}/>}/>
                </Route>
                    
    </Route>
               
    
    
    
            
        )
    )
    return(
    <RouterProvider router={router}/>
    
    )

}
