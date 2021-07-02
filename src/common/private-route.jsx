import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import sessionService from "./../services/sessionService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [session, setSession] = useState("");
  useEffect(() => {
    const sessionData = sessionService.getSession();
    if (!sessionData) {
      sessionService
        .authenticate({})
        .then(({ auth: isAuthenticated, token }) => {
          if (isAuthenticated) {
            setSession(token);
          }
        })
        .catch(err => {
          window.location.replace("/login");
        });
    } else {
      setSession(sessionData);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={props =>
        session ? (
          <Component {...props} />
        ) : (
          <div>
            <CircularProgress />
            Loading ...
          </div>
        )
      }
    />
  );
};

export default PrivateRoute;
