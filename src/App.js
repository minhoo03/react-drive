import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import DrivePage from './components/DrivePage/DrivePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/LoginPage/LoginPage'
import firebase from './firebase'
import './App.css';
import { useEffect } from "react";

function App(props) {

  let history = useHistory()

  useEffect(() => {
    // user의 상태
    firebase.auth().onAuthStateChanged(user => {
      // login
      if(user) {
        history.push('/')
      } else {
        // not login
        history.push('/login')
      }
    })
  }, [])

  return (
      <Switch>
        <Route exact path="/" component={DrivePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} /> 
      </Switch>
  );
}

export default App;
