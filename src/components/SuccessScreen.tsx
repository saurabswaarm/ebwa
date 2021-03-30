import qs from 'qs';
import { Link, useLocation} from "react-router-dom";


function SuccessScreen() {
  let location = useLocation();
  let {action, message} = qs.parse(location.search, {ignoreQueryPrefix:true});
  console.log(location);
  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h1 className="text-success"> Success </h1>
        <hr/>
        <h3 className="mb-1">You have succesfully {action} </h3>
        <p className="fs-4">
          {message}
        </p>
        <Link to="/f/welcome">Back to Welcome Screen</Link>
      </div>

  );
}

export default SuccessScreen;