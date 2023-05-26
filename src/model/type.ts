

export interface typeLogout{
    lang: string;
  }

  export interface paginationType{
    list: number[];
    pageno: number;
    showPage:number;
    totalpageCount:number;
    pagelimit:number;
  }

  export interface TransactionType{
    transactionDate:string|any,
    monthYear:string|number,
    transactionType:string,
    from:string,
    to:string,
    amount:string,
    receipt:string,
    notes:string,
    id:number,
  }

  export interface UserType{
    id?:number;
    user:{
        name?:string;
        email?:string;
        password?:string;
        respassword?:string;
    }
    token?:string;
  }