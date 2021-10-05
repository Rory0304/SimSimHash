import { React } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";

function Routers() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routers;
