
// import { LanguageData } from "./helper";
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import store from '../redux/stores/store';

// export const Data={
  
// //  

const state1=store.getState()
console.log('state1::: ', state1);  
 export const LanguageData=state1.languageSelection;
console.log('LanguageData::: ', LanguageData);
  

// }

// const LanguageData=useAppSelector((state) => { 
//      return state.languageSelection;
// })

export const monthYear = [
  LanguageData['jan'],
  LanguageData['feb'],
  LanguageData['mar'],
  LanguageData['apr'],
  LanguageData['may'],
  LanguageData['jun'],
  LanguageData['jul'],
  LanguageData['aug'],
  LanguageData['sept'],
  LanguageData['oct'],
  LanguageData['nov'],
  LanguageData['dec'],
  ];
  
  export const transactionType = [LanguageData['HomeExpense'], LanguageData['PersonalExpense'], LanguageData['Income'],];
  
  export const fromAccount = [
    LanguageData["PersonalAccount"]  ,
    LanguageData["RealLiving"],
    LanguageData["MyDreamHome"],
    LanguageData["FullCircle"],
    LanguageData["CoreRealtors"],
    LanguageData["BigBlock"] ,
  ];
  

  

// export const monthYear = [
//   "Jan ",
//   "Feb ",
//   "Mar ",
//   "Apr ",
//   "May ",
//   "Jun ",
//   "Jul ",
//   "Aug ",
//   "Sep ",
//   "Oct ",
//   "Nov ",
//   "Dec ",
// ];

// export const transactionType = ["Home Expense", "Personal Expense", "Income"];

// export const fromAccount = [
//   "Personal Account",
//   "Real Living",
//   "My Dream Home",
//   "Full Circle ",
//   "Core Realtors",
//   "Big Block",
// ];



