import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { TransactionType } from '../../../model/type';
import {defaultTransactions} from '../../../utils/helper'




const initialState:any[]=defaultTransactions

const transactionSlice=createSlice({
    name:'userTransaction',
    initialState,                                 // It contains CRUD Operation 
    reducers:{
        addTransaction(state,action:PayloadAction<any>){
            state.push(action.payload)
            
        },
        removeTransaction(state,action:PayloadAction<number>){
            console.log(action.payload, typeof action.payload)
            const newdata = [...state];

            return newdata.filter((item)=> item.id!==action.payload);
        },
        editTransaction(state,action:PayloadAction<any>){
            for(let i in state){
                        // console.log(state,"state--------------------------------------------]")
                if(state[i].id==action.payload.id){
                    state[i]=action.payload;
                  
                    return state
                    break;
                }
            }

        },
 

    }
})

export const  {addTransaction,removeTransaction,editTransaction}=transactionSlice.actions
export default transactionSlice;