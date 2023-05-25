import store from "../redux/stores/store";

const state1 = store.getState();

export const LanguageData = state1.languageSelection;

export const monthYear = [
  LanguageData["jan"],
  LanguageData["feb"],
  LanguageData["mar"],
  LanguageData["apr"],
  LanguageData["may"],
  LanguageData["jun"],
  LanguageData["jul"],
  LanguageData["aug"],
  LanguageData["sept"],
  LanguageData["oct"],
  LanguageData["nov"],
  LanguageData["dec"],
];

export const transactionType = [
  LanguageData["HomeExpense"],
  LanguageData["PersonalExpense"],
  LanguageData["Income"],
];

export const fromAccount = [
  LanguageData["PersonalAccount"],
  LanguageData["RealLiving"],
  LanguageData["MyDreamHome"],
  LanguageData["FullCircle"],
  LanguageData["CoreRealtors"],
  LanguageData["BigBlock"],
];
