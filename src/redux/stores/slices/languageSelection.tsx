import {createSlice,PayloadAction} from '@reduxjs/toolkit';

import {languageData} from '../../../utils/helper'

const initialState:any=languageData['English']

const languageList: Record<string, any> = {}={...languageData}




const languageSelectionSlice=createSlice({
    name:'languageSelection',
    initialState,                                
    reducers:{
        addLanguage(state,action:PayloadAction<any>){
            let selectlang:string=action.payload
            console.log(selectlang,"select tlanguauge==========================================")
           return state=languageList[selectlang];
            
            
        },
      

    }
})
// console.log(transactionSlice.actions)
export const  {addLanguage}=languageSelectionSlice.actions
export default languageSelectionSlice;