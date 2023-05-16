import {createSlice} from '@reduxjs/toolkit';

const transactionSlice=createSlice({
    name:'userTransaction',
    initialState:[],                                 // It contains CRUD Operation 
    reducers:{
        addTransaction(state,action){
            state.push(action.payload)
            
        },
        removeTransaction(state,action){
            state.splice(action.payload,1)
        },
        editTransaction(state,action){
            for(let i in state){
                        // console.log(state,"state--------------------------------------------]")
                if(state[i].id==action.payload.id){
                    state[i]=action.payload;
                  
                    return state
                    break;
                }
            }

        },
        viewTransaction(state,action){

        },

    }
})
// console.log(transactionSlice.actions)
export const  {addTransaction,removeTransaction,editTransaction,viewTransaction}=transactionSlice.actions
export default transactionSlice;