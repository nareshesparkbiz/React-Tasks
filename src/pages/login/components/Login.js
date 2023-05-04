import React, { useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [formValues, setformValues] = useState({
    email: "",
    pass: "",
  });

  const [formerror, setformerror] = useState({
    email: false,
    pass: false,
  });

  useEffect(() => {
    let localData = localStorage.getItem("auth_token");

    if (localData) {
      navigate("/show-table");
    }
  }, []);

  

  const emailHandler = (e) => {
    const formdata = { ...formValues };
    const formErr = { ...formerror };
    let email = e.target.value;
    const localData = localStorage.getItem("user-data");
    const userData = JSON.parse(localData);
    console.log(userData);

    for (let i in userData) {
      if (email === userData[i].email) {
        formErr.email = false;
        setformerror(formErr);
        formdata.email = email;
        console.log(formdata);
        setformValues(formdata);
        console.log(formValues, "hii");
        console.log(formerror, "hii");

        break;
      } else {
        formErr.email = true;
        formdata.email = "";
        setformValues(formdata);
        setformerror(formErr);
      }
    }
  };
  const passwordHandler = (e) => {
    const formdata = { ...formValues };
    const formErr = { ...formerror };
    let password = e.target.value;
    const localData = localStorage.getItem("user-data");
    const userData = JSON.parse(localData);

    for (let i in userData) {
      if (formdata.email == userData[i].email) {
        if (password == userData[i].password) {
          formErr.pass = false;
          setformerror(formErr);
          formdata.pass = password;
          setformValues(formdata);
          console.log(formValues, "hii");
          console.log(formerror, "hii");
          break;
        } else {
          formErr.pass = true;
          setformerror(formErr);

          console.log("not match");
        }
      }
    }
  };

  function randomStr() {
    const len = 16;
    const arr = "123456789abcdefghijklmnopqrstuvwxyz";
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  const formhandler = (e) => {
    const formdata = { ...formValues };
    console.log(formdata, "formdata");
    const formErr = { ...formerror };
    if (formErr.email == false && formErr.pass == false) {
      if (formdata.email != "" && formdata.pass != "") {
        const token = randomStr();
        console.log(token, "this is token");
        const localData = localStorage.getItem("user-data");
        const userData = JSON.parse(localData);
        console.log(userData);

        let flag=0;

        let auth_data = {};

        for (let i in userData) {
          if (
            userData[i].email === formdata.email &&
            userData[i].password === formdata.pass
          ) {
            flag=1;
            auth_data = userData[i];
            break;
            // console.log(userData[i], "in for loop");
            // // userData[i]['login']=true;
            // userData[i]["accessToken"] = token;
            // // userData[i]['status']=true

            // localStorage.setItem("auth_token", JSON.stringify(userData[i]));
            // alert("Succesful login");
          }
        }

        if(flag===1) {
          auth_data['accessToken'] = token

          localStorage.setItem("auth_token", JSON.stringify(auth_data));
          alert("Succesful login");

        }else
        {
          navigate('/register');
        }

          return <Link to="/" />;
      } else {
        alert("Some Fileds are Missing");
      }
    } else {
      alert("Please Enter Valid Details");
    }
    e.preventDefault();
  };

  return (
    <div className="container">
      <section class="vh-100" style={{ backgroundColor: "#ee" }}>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign in
                      </p>

                      <form class="mx-1 mx-md-4" onSubmit={formhandler}>
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              class="form-control"
                              onChange={(e) => emailHandler(e)}
                            />
                            <label class="form-label" for="form3Example3c">
                              Your Email
                            </label>
                            {formerror.email ? (
                              <span style={{ color: "red" }}>
                                *Email not Registered
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              class="form-control"
                              onChange={(e) => passwordHandler(e)}
                            />
                            <label class="form-label" for="form3Example4c">
                              Password
                            </label>
                            {formerror.pass ? (
                              <span style={{ color: "red" }}>
                                *Please Enter Correct password
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            class="btn btn-primary btn-lg"
                            onSubmit={(e) => formhandler(e)}
                          >
                            Login
                          </button>
                        </div>
                        <div class="text-center">
                          <p>
                            Not a member? <Link to="/register">Register</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt="Sample image"
                      />
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
};
