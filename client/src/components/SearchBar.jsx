/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { Input } from "antd";
import React from "react";

const inputStyle = css`
    display: block;
    width: 40%;
    border: 1.5px solid;
    border-radius: 40px;
    border-color: #444444;
    background-color: transparent;
    color: #fff;
    &:hover {
        background-color: #444444;
        box-shadow: 0 1px 6px 0 #171717;
        border-color: rgba(223, 225, 229, 0);
    }
`;

function SearchBar({ setKeyword }) {
    return (
        <Input
            size="large"
            placeholder="영화 제목을 검색해보세요"
            onChange={(e) => setKeyword(e.target.value)}
            css={inputStyle}
        />
    );
}

export default SearchBar;
