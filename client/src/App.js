import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { Profile } from "./components/Profile/Profile";
import { EditProfile } from "./components/Profile/EditProfile/EditProfile.js";
const App = () => {
        const user=JSON.parse(localStorage.getItem('profile'));
    

    return (
        <div>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={() => <Redirect to="/posts" />} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" exact component={PostDetails} />
                        {/* <Route path="/auth" exact component={() => ((!user) ? <Auth /> : <Redirect to="/posts" />)} /> */}
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/userpost" exact component={Profile}></Route>
                        <Route path="/editProfile" exact component={EditProfile}></Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;