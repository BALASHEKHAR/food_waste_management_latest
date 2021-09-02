import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Landing from "./screens/Landing/Landing.js";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login/Login.js";
import Register from "./screens/Register/Register.js";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
//Redux
import { Provider } from "react-redux";

import store from "./store";
import Dashboard from "./screens/DashBoard/Dashboard";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Donate from "./screens/Donate/Donate";
import Account from "./screens/Account/ProfilePage.js";
import Maps from "./screens/Maps/Maps.js";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    // initialize AOS library
    AOS.init({
      easing: "ease-in-out-back",
      duration: 1000,
      offset: 0,
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/donate" component={Donate} />
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/maps" component={Maps} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
