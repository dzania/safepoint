import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, cssBaseline } from "@material-ui/core";
import Navigation from "./components/Navigation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    maxHeight: "80vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/wave1.svg"})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
