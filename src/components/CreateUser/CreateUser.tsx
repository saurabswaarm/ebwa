import { useSelector, useDispatch } from "react-redux";
import { getUserFromState } from "../../redux/selectors";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { IPost } from '../../../types/postTypes';
import { IUserF } from "../../../types/authTypes";
import { addUser } from "../../redux/actions";

export default function CreateUser() {
  let dispatch = useDispatch();
  let user = useSelector(getUserFromState);
  let history = useHistory();
  let [userToAdd, setUserToAdd] = useState<Partial<IUserF>>({
    name:"",
    email:"",
    phone:123,
    cid:""
  });

  function handleInput(e: React.SyntheticEvent):void {
    const target = e.currentTarget as HTMLInputElement;
    setUserToAdd({
      ...userToAdd,
      [target.name]: target.value,
    });
  }

  function handleAddUser(e: React.SyntheticEvent):void {
    e.preventDefault();
    console.log(userToAdd);
    dispatch(addUser(userToAdd, history));
    history.push("/f/noticeboard");
  }

  useEffect(() => {
    if (!user.admin) {
      history.push("/f/auth/login");
    }
  });

  return (
    <>
      <div className="container m-4">
        <div className="row mb-3">
          <div className="h3">Add a user.</div>
          <p>Do remember that the user will be invited under your name.</p>
        </div>
        <div className="row">
          <form>
            <div className="mb-3">
              <label htmlFor="create-user-name-input" className="form-label">
                <b>Investor name</b>
              </label>
              <input
                required={true}
                type="text"
                className="form-control"
                name="name"
                id="create-user-name-input"
                value={userToAdd.name}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-user-title-input" className="form-label">
                <b>Investor email</b>
              </label>
              <input
                required={true}
                type="email"
                className="form-control"
                name="email"
                id="create-user-title-input"
                value={userToAdd.email}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-user-subject-input" className="form-label">
                <b>Investor phone number</b>
              </label>
              <input
                required={true}
                type="number"
                className="form-control"
                name="phone"
                id="create-user-subject-input"
                value={userToAdd.phone}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-user-subject-input" className="form-label">
                <b>CID number</b>
              </label>
              <input
                required={true}
                type="string"
                className="form-control"
                name="cid"
                id="create-user-cid-input"
                value={userToAdd.cid}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-info" onClick={handleAddUser}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
