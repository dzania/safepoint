import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/wave1.svg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundColor: "#E6F4F1",
      }}
    >
      <Router>
          <Navigation />
        <Switch>
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
