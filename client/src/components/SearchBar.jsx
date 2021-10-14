/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const divStyle = css`
    position: relative;
    display: inline-flex;
    width: 40%;
    align-items: center;
`

const inputStyle = css`
    width: 100%;
    border: 1.5px solid;
    border-radius: 40px;
    border-color: #444444;
    background-color: transparent;
    color: #fff;
    &.ant-input:focus,
    &.ant-input-focused {
        border-color: rgb(246 45 168 / 60%);
        box-shadow: 0 0 0 2px rgb(246 45 168 / 24%);
    }
    &:hover {
        background-color: #444444;
        box-shadow: 0 1px 6px 0 #171717;
        border-color: rgba(223, 225, 229, 0);
    }
`;

const buttonStyle = css`
    position: absolute;
    right: 1px;
    height: 39px;
    background-color: #444444;
    border: 1.5px solid;
    border-color: #444444;
    &:hover, &:focus {
        background-color: #222222;
        box-shadow: 0 1px 6px 0 #171717;
        border-color: rgba(223, 225, 229, 0);
    }
    [ant-click-animating-without-extra-node]&::after {
        animation: 0s;
    }
`

const searchStyle = css`
    display: block;
    width: 40%;
    border: 0;
    border-radius: 40px;
    border-color: #444444;
    background-color: transparent;

    .ant-input-group .ant-input {
        &:focus, :hover {
            background-color: #444444;
            box-shadow: 0 1px 6px 0 #171717;
            border-color: rgba(223, 225, 229, 0);
        }
    }

    input {
        display: block;
        width: 40%;
        border: 1.5px solid;
        border-radius: 40px;
        border-color: #444444;
        background-color: transparent;
        color: white;
        &:hover {
            background-color: #444444;
            box-shadow: 0 1px 6px 0 #171717;
            border-color: rgba(223, 225, 229, 0);
        }
    }

    .ant-input-group-addon {
        left: -1px;
        padding: 0;
        border: 1.5px solid;
        border-radius: 40px;
        background-color: transparent;
    }

    .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
        border-color: #F62DA8;
        background: #F62DA8;
    }

    button {
        display: block;
        border: 1.5px solid;
        border-radius: 40px;
        border-color: #444444;
        background-color: #444444;
        color: white;
        &:hover {
            background-color: #333333;
            box-shadow: 0 1px 6px 0 #171717;
            border-color: rgba(223, 225, 229, 0);
        }
    }
`

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const history = useHistory();

    const onQueryString = (keyword) => {
        keyword && history.push(`/search?keyword=${keyword}`)
    }

    return (
        <>
            <div css={divStyle} >
                    <Input
                        size="large"
                        placeholder="영화 제목을 검색해보세요"
                        onChange={(e) => setKeyword(e.target.value)}
                        onPressEnter={() => {onQueryString(keyword)}}
                        css={inputStyle}
                    />
                    <Button 
                        type="primary" 
                        shape="round" 
                        icon={<SearchOutlined />} 
                        onClick={() => {onQueryString(keyword)}}
                        css={buttonStyle}
                    >
                        검색
                    </Button>
            </div>
            {/* <Input.Search
                size="large"
                placeholder="영화 제목을 검색해보세요"
                css={searchStyle}
                onSearch={(value) => setKeyword(value)}
                enterButton="검색"
            /> */}
        </>
    );
}

export default SearchBar;
