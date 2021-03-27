import React, {useState} from "react";
import { Link, useHistory} from "react-router-dom";

function CreateAccount() {

  let [email, setEmail] = useState('');
  let history = useHistory();



  async function handleClaimAccount(e:React.SyntheticEvent) {
    e.preventDefault();
    console.log(email + ' is being claimed');

    let response:Response = await fetch("http://localhost:3006/api/auth/createaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "email": email,
      })
    });

    let responseJ = await response.json();

    if(responseJ.code == 1){
      history.push('/f/auth/accountcreated');
    } else if( responseJ.code == 456){
      history.push('/f/auth/login');
    } else if( responseJ.code == 455) {
      history.push('/f/auth/noinvite')
    }else {
      history.push('/f/error');
    }


  }

  function handleInput(e:React.BaseSyntheticEvent){
    setEmail(e.currentTarget.value);
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
      <h1>Claim your EBWA portal account</h1>
      <p className="fs-4">
        Please enter the email id you used to send documents to the association.
        Make sure you have access to it as you will be emailed a password to
        login to this portal
      </p>
      <form className="p-2 d-flex flex-column align-items-center">
        <input className="form-control" type="email" placeholder="email" value={email} onChange={handleInput}/>
        <button onClick={handleClaimAccount} className="btn btn-info mt-4">
          Claim Account
        </button>
      </form>
      <hr className="my-3" />
      <h1 className="mt-4">Already Have an account?</h1>
      <Link to="/f/auth/login/" className="btn btn-info mt-2 align-self-center">
        Login
      </Link>
    </div>
  );
}

export default CreateAccount;
