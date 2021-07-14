import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, cssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import "./App.css";

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
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
    </div>
  );
}

export default App;
