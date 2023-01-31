import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import loginStyles from "./login.module.css"

export const Login = () => {
  // const email = ''
const [email,setEmail] = useState("");
const [password,setPassword]= useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [mouseOverButon,setMouseOverButton] = useState(false)
const [error,setError] = useState({
    email:"",
    password:"",
    confirmPassword:""
})
  const clientId =
    "509895914270-t3cblvmfvak67r8jrktsljgb70k7v764.apps.googleusercontent.com";

  useEffect(() => {
    document.body.style.backgroundColor = "#e2d7f4";
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  },[]);
  const handleChange = (e)=> {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value,()=>{});
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  }
  const handleOnBlur =(name,value) => {
    switch(name){
        case "email":
            if(email==="" || value===""){
                setError({...error,email:"Please enter email."})
            }
            else{
                const match = String(email)
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  );
                  if(!match){
                    setError({ ...error, email: "Please enter valid email." });
                    return
                  }
                  else{
                    setError({ ...error, email: "" });
                  }
            }
            break;
        case "password":
            if(password===""||value===""){
                setError({ ...error, password: "Please enter password." });
            }
            else if(confirmPassword && password !== confirmPassword){
                setError({...error,password:"Passwords don't match",confirmPassword:"Passwords don't match"})
            }
            else {
                setError({
                    ...error, password:"",confirmPassword:""
                })
            }
            break;
        default:
            break;
    }
  }
  const onSuccess = (res) => {
    console.log("success:", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  return (
    <div className="col-md-12 ">
      
      <div
        className={
          "col-md-4 mx-auto border text-center " + loginStyles.loginBody
        }
      >
        <h3 className="text-center">Register</h3>
        <div className="form-group">
          <input
            type="email"
            className={
              "form-control mt-3 error " + (error.email ? "is-invalid" : "")
            }
            id="exampleInputEmail1"
            value={email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onBlur={()=>handleOnBlur("email")}
          />
          {error.email && <p className={loginStyles.error}>{error.email}</p>}
          <input
            type="password"
            className={"form-control mt-3 " + (error.password ? "is-invalid" : "")}
            id="exampleInputEmail1"
            value={password}
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter password"
            name="password"
            onBlur={()=> handleOnBlur("password")}
          />
          {error.password && <p className={loginStyles.error}>{error.password}</p>}
          <input
            type="password"
            className={"form-control mt-3 " + (error.confirmPassword? "is-invalid" : "")}
            id="exampleInputEmail1"
            value={confirmPassword}
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="confirm password"
            name="confirmPassword"
          />
          {error.confirmPassword && <p className={loginStyles.error}>{error.confirmPassword}</p>}
        </div>
        <button
          className={"btn btn-secondary col-md-6 mt-3 " + loginStyles.registerButton}
        >
          Register
        </button>
        <p className={"text-secondary mt-5 " + loginStyles.registerUsing}>
          <span>Or Register using</span>
        </p>
        <GoogleLogin
          render={(renderProps) => (
            <button
              style={{
                color: mouseOverButon ? "white" : "black",
                borderRadius: "100%",
                backgroundColor: mouseOverButon ? "black" : "white",
                padding: "1% 2%",
              }}
              onMouseEnter={() => setMouseOverButton(true)}
              onMouseLeave={() => setMouseOverButton(false)}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i className="bi bi-google"></i>
            </button>
          )}
          clientId={clientId}
          buttonText=""
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
    </div>
  );
};
