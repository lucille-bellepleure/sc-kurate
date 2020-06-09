import React from 'react';
import { Route, NavLink } from "react-router-dom";
import pages from "./pages";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.swarmcity}>
      {pages.map(({ path, exact, component }) => (
        <Route key={path} {...{ path, exact, component }} />
      ))}
    </div>
  );
}

export default App;
