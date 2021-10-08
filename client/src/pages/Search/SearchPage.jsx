/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Rate } from "antd";
import { sample } from "../../assets/Sample";
import Poster from "../../components/Poster";

const SearchResultWrapper = css`
    padding: 30px;
`;

const resultStyle = css`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    text-align: center;
    gap: 35px;
`;

function SearchPage() {
    const [keyword, setKeyword] = useState();
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    useEffect(() => {
        setFilteredMovieList(sample.filter((movie) => movie.title.includes(keyword)));
    }, [keyword]);

    const target = (filteredMovieList.length >= 1 && filteredMovieList) || sample;

    return (
        <div css={SearchResultWrapper}>
            <div>
                <input onChange={(e) => setKeyword(e.target.value)} />
            </div>
            <div css={resultStyle}>
                {target.map((item) => {
                    return <Poster item={item} setKeyword={setKeyword} />;
                })}
            </div>
        </div>
    );
}

export default SearchPage;
