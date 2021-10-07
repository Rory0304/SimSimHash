import { React } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import SearchPage from "./pages/Search/Search";
import Header from "./components/Header";

function Routers() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routers;
