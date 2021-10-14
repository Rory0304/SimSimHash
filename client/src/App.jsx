/** @jsxImportSource @emotion/react */

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Router from "./Router";
import mainTagDataSlice from "./modules/MainPage/tagDataSlice";
import DefaultsearchMovieSlice from "./modules/SearchPage/DefaultsearchMovieSlice";
import SearchedMovieSlice from "./modules/SearchPage/SearchedMovieSlice";
import { css, jsx } from "@emotion/react";

import "./App.css";

function App() {
    const rootReducer = combineReducers({
        mainTagDataSlice: mainTagDataSlice,
        searchMovieSlice: DefaultsearchMovieSlice,
        SearchedMovieSlice: SearchedMovieSlice
    });

    const store = configureStore({
        reducer: rootReducer
    });

    return (
        <Provider store={store}>
            <div>
                <Router />
            </div>
        </Provider>
    );
}

export default App;
