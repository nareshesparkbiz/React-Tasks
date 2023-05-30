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

           return state=languageList[selectlang];
            
            
        },
        

    }
})

export const  {addLanguage}=languageSelectionSlice.actions
export default languageSelectionSlice;