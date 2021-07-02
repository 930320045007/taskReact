import logo from "./logo.svg";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import sessionService from "./services/sessionService";
import NotFound from "./misc/not-found";
import PrivateRoute from "./common/private-route";
import Form from "./component/form";

// import AppState from "./context/app-state";

class App extends Component {
  state = { session: sessionService };
  render() {
    console.log("session", this.state.session);
    return (
      // <Switch>
      //   <Route path="/not-found" component={NotFound} />
      //   <PrivateRoute
      //     path="/private"
      //     session={this.state.session}
      //     component={Form}
      //   />
      //   <Redirect from="/" exact to="/private" />
      //   <Redirect to="/not-found" />
      // </Switch>
      <Form />
    );
  }
}

export default App;
