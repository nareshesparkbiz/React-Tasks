import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import {defaultTransactions} from '../../../utils/helper'
const initialState:Array<any> =defaultTransactions

const transactionSlice=createSlice({
    name:'userTransaction',
    initialState,                                 // It contains CRUD Operation 
    reducers:{
        addTransaction(state,action:PayloadAction<any>){
            state.push(action.payload)
            
        },
        removeTransaction(state,action:PayloadAction<any>){
            state.splice(action.payload,1)
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
        viewTransaction(state,action:PayloadAction<string>){

        },

    }
})
// console.log(transactionSlice.actions)
export const  {addTransaction,removeTransaction,editTransaction,viewTransaction}=transactionSlice.actions
export default transactionSlice;