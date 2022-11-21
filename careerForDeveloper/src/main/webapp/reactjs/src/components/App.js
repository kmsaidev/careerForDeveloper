import '../App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import DropUser from "./DropUser";
import Main from "./Main";
import Update from "./Update";
import Posts from "./Posts";
import PostView from "./PostView";
import React from "react";
import NewPost from "./NewPost";
import DeletePost from "./DeletePost";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/delete" element={<DropUser/>}/>
              <Route path="/update" element={<Update/>}/>
              <Route path="/posts" element={<Posts />}/>
              <Route path="/posts/:postId" element={<PostView />}/>
              <Route path="/posts/new" element={<NewPost />}/>
              <Route path="/posts/delete/:postId" element={<DeletePost />}/>
              <Route path="/comments/delete/:commentId" element={<DeleteComment />}/>
              <Route path="/comments/update/:commentId" element={<UpdateComment />}/>
          </Routes>
      </Router>
  );
}

export default App;
