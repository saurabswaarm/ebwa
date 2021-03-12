import MainFeed from "./components/NoticeBoard/MainFeed/MainFeed";
import CurrentUser from "./components/NoticeBoard/CurrentUser/CurrentUser";
import AppWrapper from "./components/AppWrapper"
import AppBar from "./components/AppBar/AppBar";
import CreateAccount from "./components/Authentication/CreateAccount";
import Authentication from './components/Authentication/Authentication';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
      <AppWrapper>
        <AppBar />
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>


        </Switch>
        <CreateAccount/>
        {/* <CurrentUser />
        <MainFeed/> */}
      </AppWrapper>
    </Router>
  )
}

export default App;
