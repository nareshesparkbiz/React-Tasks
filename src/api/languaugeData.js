
import { useAppSelector, useAppDispatch } from '../redux/hooks'


 export const LanguageData=useAppSelector((state) => { 
    return state.languageSelection;
  });

  