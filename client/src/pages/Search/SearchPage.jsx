/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";

import { sample } from "../../assets/Sample";
import Poster from "../../components/Poster";
import SearchBar from "../../components/SearchBar";

const searchBannerStyle = css`
    display: flex;
    height: 17.5rem;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    p {
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 18px;
    }
`;

const SearchResultWrapper = css`
    padding: 30px;
`;

const resultStyle = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5.3rem 2.5rem;
    justify-items: center;
`;

const noresult = css`
    color: white;
    text-align: center;
    margin-top: 150px;
`

function SearchPage() {
    const [keyword, setKeyword] = useState();
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    useEffect(() => {
        setFilteredMovieList(sample.filter((movie) => movie.title.includes(keyword)));
    }, [keyword]);

    const target = (filteredMovieList.length >= 1 && filteredMovieList) || sample;

    return (
        <div css={SearchResultWrapper}>
            <div css={searchBannerStyle}>
                <p>심심해시에서 다양한 영화를 검색해보세요!</p>
                <SearchBar setKeyword={setKeyword} />
            </div>
            {(keyword == null && target == sample) || (keyword !== null && target == filteredMovieList) ? (
                <ul css={resultStyle}>
                    {target.map((item) => {
                        return <Poster item={item} setKeyword={setKeyword} />;
                    })}
                </ul>
            ) : <p css={noresult}>'{keyword}'에 대한 검색 결과가 없습니다.</p>
            }
        </div>
    );
}

export default SearchPage;