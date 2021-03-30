import { Link } from "react-router-dom";
import { IUserF } from "../../../../types/authTypes";

export default function UserActions({user}:{user:IUserF}) {
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {user.admin ? <Link to="/f/noticeboard/createpost" className="btn btn-dark my-3">Create Post</Link> : null }
                </div>
                <div className="col text-center">
                    {user.admin ? <Link to="/f/auth/createuser" className="btn btn-dark my-3">Create User</Link> : null }
                </div>
            </div>
        </div>
        
        </>
    )
}