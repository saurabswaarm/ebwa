function NoticeBoardWrapper(props) {
    return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-sm-10 p-0 bg-white">
              {props.children}
            </div>
          </div>
        </div>
    )
}

export default NoticeBoardWrapper;