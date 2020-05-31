import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import pages from "./pages";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from "@material-ui/core";
import styles from "./styles.module.css";


function App() {
  return (
    <div className={styles.SwarmCity}>
      {pages.map(({ path, exact, component }) => (
        <Route key={path} {...{ path, exact, component }} />
      ))}
    </div>
  );
}

export default App;
