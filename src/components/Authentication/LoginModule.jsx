import { Link } from "react-router-dom";

 function LoginModule(){
    return (
        <form className="p-2 d-flex flex-column align-items-stretch">
        <input
          className="form-control my-2"
          type="email"
          placeholder="email"
          required
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="password"
          required
        />
        <button className="btn btn-info mt-4">Login</button>
        <Link to="/auth/forgotpassword" className="btn btn-info mt-4">Forgot Password</Link>
      </form> 
    )
}

export default LoginModule;