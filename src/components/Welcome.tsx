import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {getUserFromState} from '../redux/selectors';
import { Link } from "react-router-dom";
import { resumeSession } from '../redux/actions';



function Welcome() {
  let history = useHistory();
  let user = useSelector(getUserFromState);
  let dispatch = useDispatch();

  let [checkedSession, setSessionCheck] = useState(false);

  useEffect(()=>{
    if(user){
      console.log('Pre-existing session detected, rerouting. User:'+ user.email)
      history.push('/f/noticeboard');
    }

    if(!user && !checkedSession){
      console.log('Found no user, dispatching a resumeSession');
      dispatch(resumeSession());
      setSessionCheck(true);
    }
  })
  
  let chartStyle = { 
    backgroundColor: "#FFFFFF", 
    border: "none",
    borderRadius: "2px",
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
    margin:"20px auto 20px auto"
  };

  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h1 className="mb-5">Welcome to Expat Buyer's Welfare Associaiton</h1>
        <p className="fs-4">
          If this is your first time here, please claim your account.
        </p>
        <Link to="/f/auth/createaccount" className="btn btn-info mt-2 align-self-center">
          Claim Account
        </Link>
        <hr className="my-3" />
        <h1 className="mt-4">Already Have an account?</h1>
        <Link to="/f/auth/login" className="btn btn-info mt-2 align-self-center">
          LogIn
        </Link>
        <h3 className="mt-5">Users who have actived their accounts</h3>
        <iframe style={chartStyle} width="320" height="240" src="https://charts.mongodb.com/charts-project-0-xksgk/embed/charts?id=25ea2996-39b1-401c-8782-12ffc2adf43b&theme=light"/>
      </div>
  );
}

export default Welcome;
