import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import App from "./components/App";
import DropUser from "./components/DropUser"

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/delete" element={<DropUser />} />
                </Routes>
            </Router>
        );
    }
}

export default AppRouter;