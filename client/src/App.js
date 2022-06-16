import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {


    return (
        <div>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/auth" exact component={Auth}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;