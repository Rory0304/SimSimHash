/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Rate } from "antd";
import { sample } from "../Main/Sample";

const resultStyle = css`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    align-items: center;
`

const divStyle = css`
    margin: 0 auto;
    width: 150px;
    padding: 10px;
    border-radius: 15px;
    background-color: #444444;
    text-align: center;
    margin-right: 15px;
    margin-left: 15px;
`

const imgStyle = css`
    width: 100px;
    transform: scale(1); //default값
    -webkit-transform: scale(1); ////default값
    -moz-transform: scale(1); //crome
    transition: all 0.2s ease-in-out;
`;

const rateStyle = css`
    font-size: 13px;
`;

const fontStyle = css`
    font-size: 13px;
    color: #ffffff;
`;

function SearchPage() {
    const [keyword, setKeyword] = useState();
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    useEffect(() => {
        setFilteredMovieList(sample.filter((movie) => movie.title.includes(keyword)));
    }, [keyword]);

    const target = (filteredMovieList.length >= 1 && filteredMovieList) || sample;

    return (
        <div>
            <div css={resultStyle}>
                {target.map((item) => {
                    return (
                        <div>
                            <div css={divStyle}>
                                <form onChange={(e) => setKeyword(e.target.value)} />
                                <img src={item.img} css={imgStyle} />
                                <p css={fontStyle}>{item.title}</p>
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={Math.round(item.star / 2)}
                                    css={rateStyle}
                                />
                                <p css={fontStyle}>{item.tag}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <input onChange={(e) => setKeyword(e.target.value)} />
            </div>
        </div>
    );
}

export default SearchPage;
