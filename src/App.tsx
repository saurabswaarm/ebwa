import AppWrapper from "./components/AppWrapper"
import AppBar from "./components/AppBar/AppBar";
import Authentication from './components/Authentication/Authentication';
import Welcome from './components/Welcome';
import ErrorScreen from './components/ErrorScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";




function App() {
  return (
    <Router>
      <AppWrapper>
        <AppBar />
        <Switch>
          <Route path="/f/auth">
            <Authentication />
          </Route>

          <Route path="/f/noticeboard">
            <NoticeBoard/>
          </Route>

          <Route path="/f/error">
            <ErrorScreen/>
          </Route>

          <Route path="/">
            <Welcome/>
          </Route>

        </Switch>
      </AppWrapper>
    </Router>
  )
}

export default App;
