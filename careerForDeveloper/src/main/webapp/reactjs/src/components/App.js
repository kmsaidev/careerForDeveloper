import '../App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import DropUser from "./DropUser";
import Main from "./Main";
import Update from "./Update";
import Posts from "./Posts";
import React from "react";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/delete" element={<DropUser/>}/>
              <Route path="/update" element={<Update/>}/>
              <Route path="/posts" element={<Posts />}/>
          </Routes>
      </Router>
  );
}

export default App;
