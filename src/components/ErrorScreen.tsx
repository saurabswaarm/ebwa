import qs from 'qs';
import { Link, useLocation} from "react-router-dom";


function ErrorScreen() {
  let location = useLocation();
  let {error} = qs.parse(location.search, {ignoreQueryPrefix:true});
  console.log(location);
  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h3 className="text-danger"> {error} </h3>
        <hr/>
        <h1 className="mb-1">We Faced an error.</h1>
        <p className="fs-4">
          We are sorry something went wrong please use the back button to go where you were.
        </p>
        
        <Link to="/f/auth/welcome">Back to Welcome Screen</Link>
      </div>

  );
}

export default ErrorScreen;
