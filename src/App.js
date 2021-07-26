import React from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/authRoute";
import MenuBar from "./components/menuBar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import SinglePost from "./pages/singlePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route path="/posts/:postId" component={SinglePost} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
