import React,{useState,useMemo,memo,useEffect,useRef,useImperativeHandle,forwardRef, useContext,
createContext,useReducer} from "react";
import {BrowserRouter,Routes,Route,Outlet,Link} from "react-router-dom";
import ReactDOM from "react-dom";
import "./test1.scss";



  function Blockcode1(){
      var [datainput,setDatainput] = useState({});

      var Handledata = (event) => {
          var name = event.target.name;
          var value = event.target.value;
          setDatainput((val)=>({...val,[name]:value}));
      }
    
      return (
          <div>
              <form id="form1" name="form1" title="form1" action="/index2" method="post" target="_self"
              style={{fontSize:"35px",width:"700px",padding:"20px",border:"4px double yellowgreen"}}
             >
                       <label htmlFor="name_input"><b>Name:</b></label><br/>
                       <input id="name_input" title="name_input" name="name_input" type="text"
                       placeholder="Enter your name..." style={{width:"100%"}}
                       data-name-input="name_input1_data" value={datainput.name_input || ""}
                        onChange={Handledata}/>

                      <label htmlFor="email_input"><b>Email:</b></label><br/>
                       <input id="email_input" title="email_input" name="email_input" type="email"
                       placeholder="Enter your email..." style={{width:"100%"}}
                       data-email-input="email_input1_data" value={datainput.email_input || ""}
                        onChange={Handledata}/>

                        <button id="register_butt" title="register_butt" type="submit" 
                        data-register-butt="register_butt1_data" style={{fontSize:"35px"}}
                        className="btn btn-block btn-success text-white w3-hover-orange w3-hover-text-white">
                            <i className="fa fa-sign-in"></i> REGISTER
                       </button>
              </form>
          </div>
      )
  }



  ReactDOM.render(<Blockcode1/>,document.getElementById("block0"));




