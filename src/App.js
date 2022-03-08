import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/a">a</Link>
        </li>
        <li>
          <Link to="/b">b</Link>
        </li>
        <li>
          <Link to="/c">c</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/a" element={<h1>Page a</h1>} />
        <Route path="/b" element={<h1>Page b</h1>} />
        <Route path="/c" element={<h1>Page c</h1>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
