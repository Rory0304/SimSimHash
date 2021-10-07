/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
function MainIntro() {
    return (
        <div css={MainIntroWrapStyle}>
            <div>
                <img src={require("../../assets/logo.png")} alt="심심해시 로고" />
            </div>
            <p>태그를 선택하여 새로운 영화 취향을 발견해보세요!</p>
        </div>
    );
}

const MainIntroWrapStyle = css`
    width: 100%;
    height: 164px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
`;

export default MainIntro;
