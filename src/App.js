import AppWrapper from "./components/AppWrapper"
import AppBar from "./components/AppBar/AppBar";
import Authentication from './components/Authentication/Authentication';
import Welcome from './components/Welcome';

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
          <Route path="/auth">
            <Authentication />
          </Route>

          <Route path="/noticeboard">
            <NoticeBoard/>
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
