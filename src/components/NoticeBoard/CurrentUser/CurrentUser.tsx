import {useSelector} from 'react-redux';
import { IUserF } from '../../../../types/authTypes';
import {getUserFromState} from '../../../redux/selectors';

function CurrentUser(props:{user:IUserF}) {
  let user = props.user;

    return (
        <div className="container mt-3 mb-0">
              <div className="row">
                <h2 className="text-center mb-0">Hello, {user.name!}</h2>
              </div>
              <div className="row justify-content-center gx-0 pt-0">
                <div className="col-4 text-end text-muted">CID {user.cid}</div>
                <div className="col-1 text-center"><b>|</b></div>
                <div className="col-4 text-start text-muted">{user.designation}</div>
              </div>
       </div>
      )
}

export default CurrentUser