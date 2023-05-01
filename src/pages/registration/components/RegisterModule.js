import React, { useState } from 'react';


export const Register=()=>{


    const [formValue,setformValue]=useState({
        name:"",
        email:"",
        password:"",
    })

    const [formerror,setformerror] = useState({
        name:false,
        email:false,
        password:false,
        repassword:false,
    })

const nameHandler=(e)=>{
let data={...formValue}
let error={...formerror}
let name=e.target.value;
const nameReg=/[^a-zA-Z]/;
if(nameReg.test(name)){
    error.name=true;
    data.name=""

    setformValue(data);
    setformerror(error)  
}
else{
    error.name=false;
    data.name=name;

    setformValue(data);
    setformerror(error)  
}
console.log(formValue,formerror)
}

const emailHandler=(e)=>{
    let email=e.target.value;
    let data={...formValue}
    let error={...formerror}
    const emailReg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailReg.test(email)){
        data.email=email;
        error.email=false;

        setformValue(data);
        setformerror(error)  
    }
    else{console.log("dsdfsfsdf")
        data.email="";
        error.email=true;

        setformValue(data);
        setformerror(error)  
    }

}

const passwordHandler=(e)=>{
    let password=e.target.value;
    let data={...formValue}
    let error={...formerror}

    if(password.length<8 ){
        console.log("Password")
        data.password="";
        error.password=true;

        setformValue(data);
        setformerror(error)  
    }
    else{
        data.password=password;
        error.password=false;

        setformValue(data);
        setformerror(error)  
    }

}

const RepasswordHandler=(e)=>{
    let repassword=e.target.value;
    let data={...formValue}
    let error={...formerror}

    if(repassword==data.password){
        data.password="";
        error.repassword=true;

        setformValue(data);
        setformerror(error)  
    }
    else if( repassword.length<8 ){
        data.password="";
        error.repassword=true;

        setformValue(data);
        setformerror(error)  
    }
    else{
       
        error.repassword=false;

        setformerror(error)  

    }
}

const formhandler=(e)=>{
    e.preventDefault();
    console.log("submit")
    let data={...formValue}
    let error={...formerror}

    if(data.name!="" && data.email!="" && data.password!=""){
        if(error.name==false && error.email==false && error.password==false && error.repassword==false){
            alert("Thank You ")
        }
        else{
            alert("Please Enter Valid Fields data")
        }
    }
    else{
        alert("Some Fields Are Missing")
    }
 
}


  return (
    <div className="container">

   
    <section class="vh-100"style={{backgroundColor: "#ee"}}>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black"style={{borderRadius: '25px'}}>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
  
                  <form class="mx-1 mx-md-4" onSubmit={formhandler}>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" onChange={(e)=>{nameHandler(e)}} />
                        <label class="form-label" for="form3Example1c">Your Name</label>
                        {formerror.name?<span style={{color:'red'}}>*Field only contains characters</span>:""}
                      </div>
                   
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" onChange={(e)=>(emailHandler(e))} />
                        <label class="form-label" for="form3Example3c">Your Email</label>
                        {formerror.email?<span style={{color:'red'}}>*Enter Valid Email</span>:""}
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" class="form-control" onChange={(e)=>(passwordHandler(e))} />
                        <label class="form-label" for="form3Example4c">Password</label>
                        {formerror.password?<span style={{color:'red'}}>*Please Enter Password as per mentioned</span>:""}
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4cd" class="form-control"  onChange={(e)=>(RepasswordHandler(e))} />
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        {formerror.repassword?<span style={{color:'red'}}>*Password are not same</span>:""}
                       
                      </div>
                    </div>
  
                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                      <label class="form-check-label" for="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>
  
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg" onSubmit={(e)=>(formhandler(e))}>Register</button>
                    </div>
  
                  </form>
  
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    
   
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample image"/>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  );
}

