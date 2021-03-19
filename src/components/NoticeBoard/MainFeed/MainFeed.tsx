import Post from "./Post";

function MainFeed() {
    return (
        <>
            <div className="conatiner mt-3 px-3">
                <h5>Notice Board</h5>
                <hr className="my-0"></hr>
                <Post/>
                <Post/>
            </div>
        </>
    )
}

export default MainFeed;