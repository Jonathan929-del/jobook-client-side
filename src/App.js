//Imports
import './App.css';
import Home from './Pages/Home';
import Share from './Pages/Share';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


// Main Function
function App() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {user ? <Home /> : <Login />}
          </Route>
          <Route path={"/profile/:firstname"}>
            {user ? <Profile /> : <Login />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/"/> : <Register />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login />}
          </Route>
          <Route path="/share">
            <Share />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


// Exports
export default App;