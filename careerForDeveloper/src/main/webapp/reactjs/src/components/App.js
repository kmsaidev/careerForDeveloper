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
import UpdatePost from "./UpdatePost";
import DeleteReply from "./DeleteReply";
import NewProject from "./NewProject";
import ProjectView from "./ProjectView";
import DeleteProject from "./DeleteProject";
import UpdateProject from "./UpdateProject";
import Projects from "./Projects";

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
              <Route path="/posts/:postId/update" element={<UpdatePost />}/>
              <Route path="/reply/delete/:commentAnswerId" element={<DeleteReply />}/>
              <Route path="/projects/new" element={<NewProject />}/>
              <Route path="/projects/:projectId" element={<ProjectView />}/>
              <Route path="/projects/delete/:projectId" element={<DeleteProject />}/>
              <Route path="/projects/update/:projectId" element={<UpdateProject />}/>
              <Route path="/projects/category/:categoryId" element={<Projects />}/>
          </Routes>
      </Router>
  );
}

export default App;
