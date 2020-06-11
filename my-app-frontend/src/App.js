import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import Places from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlaces";
import logo from "./logo.svg";
import "./App.css";
import MainNavigation from "./shared/components/MainNavigation";
import SignInSide from "./user/pages/signin";
import SignUp from "./user/pages/signup";
import UpdatePlace from "./places/pages/updateplace";

const App = () => {
  const [currUser, setCurr] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLog] = useState(false);
  const [currplace, setplace] = useState(null);
  const [token, setToken] = useState(null);
  const loggedout = () => {
    setLog(false);
    setCurr("");
    setToken(null);
    setName("");
    localStorage.removeItem('userData');
  }
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (stored) {
      setLog(true);
      setToken(stored.token);
      setCurr(stored.userId);
      setName(stored.name);
      console.log(stored.userId);
    }

  }, [loggedIn]);

  return (
    <Router>
      <MainNavigation log={loggedIn} logout={loggedout} curr={currUser} name={name} />
      <Switch>
        <Route path="/:userid/places" exact>
          <Places curr={currUser} />
        </Route>

        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace userid={currUser} token={token} />
        </Route>
        <Route path="/signin" exact>
          <SignInSide log={setLog} curr={setCurr} settoken={setToken} setname={setName} />
        </Route>
        <Route path="/signup" exact>
          <SignUp log={setLog} curr={setCurr} settoken={setToken} setname={setName} />
        </Route>
        <Route path="/places/update/:pid" exact>
          <UpdatePlace token={token} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
