import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DrivePage from './components/DrivePage/DrivePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/LoginPage/LoginPage'
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={DrivePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} /> 
        </Switch>
    </Router>
  );
}

export default App;
