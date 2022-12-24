import '../App.css';
import React, {useEffect} from "react";
import {getCookieToken} from "../utils/Cookie";
import axios from "axios";
import {SET_TOKEN} from "../Store/Auth";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "../pages/Signup";
import DropUser from "./DropUser";
import Update from "./Update";
import Posts from "../pages/Posts";
import PostView from "./PostView";
import NewPost from "./NewPost";
import DeletePost from "./DeletePost";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";
import UpdatePost from "./UpdatePost";
import DeleteReply from "./DeleteReply";
import NewProject from "./NewProject";
import ProjectView from "../pages/ProjectView";
import DeleteProject from "./DeleteProject";
import UpdateProject from "./UpdateProject";
import Projects from "../pages/Projects";
import ProjectRequest from "./ProjectRequest";
import ProjectRequestView from "./ProjectRequestView";
import RequestView from "../pages/RequestView";
import UserRequest from "../pages/UserRequest";
import MyPosts from "../pages/MyPosts";
import MyProjects from "../pages/MyProjects";
import UpdateProfile from "../pages/UpdateProfile";

function App() {
    const dispatch = useDispatch();

    function initializeUserInfo() {
        const refreshToken = getCookieToken();
        if (!refreshToken) return;
        axios.get("/auth", {
            headers: {
                "REFRESH-TOKEN": refreshToken,
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                return alert(res.data.message);
            }
            axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
            dispatch(SET_TOKEN(res.data.result.accessToken));
        })

    }

    useEffect(() => {
        initializeUserInfo();
    }, []);
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
              <Route path="/posts/update/:postId" element={<UpdatePost />}/>
              <Route path="/reply/delete/:commentAnswerId" element={<DeleteReply />}/>
              <Route path="/projects/new" element={<NewProject />}/>
              <Route path="/projects/:projectId" element={<ProjectView />}/>
              <Route path="/projects/delete/:projectId" element={<DeleteProject />}/>
              <Route path="/projects/update/:projectId" element={<UpdateProject />}/>
              <Route path="/projects/category/:categoryId" element={<Projects />}/>
              <Route path="/projects/request/:projectId" element={<ProjectRequest />}/>
              <Route path="/projects/request/view/:projectId" element={<ProjectRequestView />}/>
              <Route path="/request/view/:requestId" element={<RequestView />}/>
              <Route path="/users/projects" element={<MyProjects />} />
              <Route path="/users/requests" element={<UserRequest />} />
              <Route path="/users/posts" element={<MyPosts />} />
              <Route path="/users/profile/update" element={<UpdateProfile />}/>
          </Routes>
      </Router>
  );
}

export default App;
