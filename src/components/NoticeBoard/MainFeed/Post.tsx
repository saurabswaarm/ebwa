import {IPost} from '../../../../types/postTypes';

function Post(props:{post:IPost}){
    let post = props.post;
    let dateObj = new Date(post.date);
    return (
        <>
            <div className="container-fluid bg-light my-4 p-4">

                <div className="row align-items-center">

                    <div className="col-10"> 
                        <p className = "fs-5 my-0"> <b>{post.author.name}</b> | <span className = "fs-6 text-muted"> {post.author.designation} </span> </p>
                        <p className = "fs-6 my-0 text-muted"> {dateObj.toLocaleDateString()}</p> 
                    </div>

                    <div className="col-2 d-flex justify-content-end">
                        <button className="btn btn-info"> Edit </button>
                    </div>

                </div>

                <div className="row">
                    <div className="col-12">
                        <p className="fs-4 mt-3 text-center"><b>{post.title}</b></p>
                        <p className="fs-5 mt-3 text-center">{post.subject}</p>

                    </div>

                    <div className="col-12">
                        <p className="fs-6 mt-3 text-left">{post.message}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Post;