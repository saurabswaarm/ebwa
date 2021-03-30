import { IPost } from "../../../../types/postTypes";
import Post from "./Post";

function MainFeed({posts}:{posts:IPost[]}) {

    let postsToRender = [];

    for(let post of posts){
        postsToRender.push(<Post post={post}/>)
    }

    return (
        <>
            <div className="conatiner mt-3 px-3">
                <h5>Notice Board</h5>
                <hr className="my-0"></hr>
                {postsToRender}
            </div>
        </>
    )
}

export default MainFeed;