/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import logo from "../../assets/logo.png";

function MainIntro() {
    return (
        <div css={MainIntroWrapStyle}>
            <div>
                <img src={logo} alt="심심해시 로고" css={LogoAreaStyle} />
            </div>
            <p>키워드로 취향에 맞는 영화를 찾아보세요!</p>
        </div>
    );
}

const MainIntroWrapStyle = css`
    width: 100%;
    height: 200px;
    margin-top: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    gap: 15px;

    p {
        font-size: 1.25rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.8);
    }
`;

const LogoAreaStyle = css`
    width: 617px;
    object-fit: cover;
`;

export default MainIntro;
