import {createSlice,PayloadAction} from '@reduxjs/toolkit';

const initialState:string="";




const selectedlangSlice=createSlice({
    name:'selectedlang',
    initialState,                                
    reducers:{
        addselectedLang(state,action:PayloadAction<any>){
            

           return state=action.payload
            
            
        },
        

    }
})

export const  {addselectedLang}=selectedlangSlice.actions
export default selectedlangSlice;