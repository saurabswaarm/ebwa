import { useSelector, useDispatch } from "react-redux";
import { getUserFromState } from "../../redux/selectors";
import { useHistory } from "react-router";
import { useEffect , useState } from "react";
import { addPost } from "../../redux/actions";
import { IPost } from "../../../types/postTypes";

export default function CreatePost() {
  let dispatch = useDispatch();
  let user = useSelector(getUserFromState);
  let history = useHistory();
  let [post, setPost] = useState<Partial<IPost>>({
    title:"",
    subject:"",
    message:""
  })

  function handleInput(e: React.SyntheticEvent):void {
    const target = e.currentTarget as HTMLInputElement;
    setPost({
      ...post,
      [target.name]: target.value,
    });
  }

  function handleAddPost(e:React.SyntheticEvent){
    e.preventDefault();
    dispatch(addPost(post));
    history.push('/f/noticeboard');
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
            <div className="h3">Add a notification to the notice board.</div>
            <p>Do remember that the post will be signed under your name.</p>
        </div>
        <div className="row">
          <form>
            <div className="mb-3">
              <label htmlFor="post-title-input" className="form-label">
                <b>Title</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="post-title-input"
                value={post.title}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-subject-input" className="form-label">
                <b>Subject</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="subject"
                id="post-subject-input"
                value={post.subject}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-message-input" className="form-label">
                <b>Message</b>
              </label>
              <textarea
                className="form-control"
                name="message"
                id="post-message-input"
                value={post.message}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
                <button className="btn btn-info" onClick={handleAddPost}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
