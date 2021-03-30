import CurrentUser from "./CurrentUser/CurrentUser";
import MainFeed from "./MainFeed/MainFeed";
import {useEffect} from 'react';
import {useHistory} from 'react-router';
import {useSelector} from 'react-redux';
import {getUserFromState, getPostsFromState} from '../../redux/selectors';
import UserActions from "./CurrentUser/UserActions";

export default function NoticeBoard() {

  let history = useHistory();
  let user = useSelector(getUserFromState);
  let posts = useSelector(getPostsFromState);

  useEffect(()=>{
    
    if(!user){
      console.log('Redirecting to Login');
      history.push('/f/auth/login');
    } else {
      console.log('Notice board found user : '+ user.email);
    }
    
  
  },[user])

  return (
    <>
      <CurrentUser user={user}/>
      <UserActions user={user}/>
      <MainFeed posts={posts}/>
    </>
  );
}
