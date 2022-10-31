import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
// import App from "./components/App";

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/*<Route path="/login" component={<Login />} />*/}
                </Routes>
            </Router>
        );
    }
}

export default AppRouter;