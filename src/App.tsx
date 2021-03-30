import AppWrapper from "./components/AppWrapper"
import AppBar from "./components/AppBar/AppBar";
import Authentication from './components/Authentication/Authentication';
import Welcome from './components/Welcome';
import ErrorScreen from './components/ErrorScreen';
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import { config } from "./config";
import CreatePost from "./components/CreatePost/CreatePost";
import CreateUser from "./components/CreateUser/CreateUser"
import SuccessScreen from "./components/SuccessScreen";




function App() {
  return (
    <Provider store={store}>
       <Router>
      <AppWrapper>
        <AppBar />
        <Switch>

          <Route path = '/f/auth/createuser'>
            <CreateUser/>
          </Route>

          <Route path="/f/auth/*">
            <Authentication />
          </Route>

          <Route exact path="/f/noticeboard/createpost">
            <CreatePost/>
          </Route>

          <Route exact path="/f/noticeboard">
            <NoticeBoard/>
          </Route>

          <Route path="/f/error">
            <ErrorScreen/>
          </Route>

          <Route path="/f/success">
            <SuccessScreen/>
          </Route>

          <Route path="/">
            <Welcome/>
          </Route>

        </Switch>
      </AppWrapper>
    </Router>
    </Provider>
   
  )
}

export default App;
