import { React } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import SearchPage from "./pages/Search/SearchPage";
import DetailPage from "./pages/Detail/DetailPage";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

function Routers() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
                <Route exact path="/movie/:id" render={(props) => <DetailPage {...props} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routers;
