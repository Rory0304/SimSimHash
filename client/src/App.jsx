/** @jsxImportSource @emotion/react */

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Router from "./Router";
import mainTagDataSlice from "./modules/MainPage/tagDataSlice";
import { css, jsx } from "@emotion/react";

import "./App.css";

function App() {
    const rootReducer = combineReducers({
        mainTagDataSlice: mainTagDataSlice
    });

    const store = configureStore({
        reducer: rootReducer
    });

    return (
        <Provider store={store}>
            <div css={wrapperStyle}>
                <Router />
            </div>
        </Provider>
    );
}

const wrapperStyle = css`
    background-color: #24262b;
    height: 100vh;
`;

export default App;
