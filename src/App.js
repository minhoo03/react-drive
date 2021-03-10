import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import {
  setUser,
  clearUser
} from './Redux/actions/user_action'

import {
  setCurrentChatRoom
} from './Redux/actions/drive_action'

import DrivePage from './components/DrivePage/DrivePage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/LoginPage/LoginPage'
import firebase from './firebase'
import './App.css';
import { useEffect } from "react";

function App(props) {

  let history = useHistory()
  let dispatch = useDispatch()
  let isLoading = useSelector(state => state.user.isLoading)

  useEffect(() => {
    // user의 상태
    firebase.auth().onAuthStateChanged(user => {
      // login
      if(user) {
        history.push('/')
        dispatch(setUser(user))
      } else {
        // not login
        history.push('/login')
        dispatch(clearUser(user))
      }
    })
  }, [])

  if(isLoading) {
    return (
      <div style={{display:'flex', justifyContent:'center', lineHeight:'50%', height:'100vh'}}>
        <img src="https://www.vario-mobil.com/VNG/gfx/loading_white.gif" />
      </div>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/" component={DrivePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} /> 
      </Switch>
    );
  }
}

export default App;
