/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import DefaultMovieList from "./DefaultMovieList";
import SearchedMovieList from "./SearchedMovieList";

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

function SearchPage() {
    const [keyword, setKeyword] = useState("");

    return (
        <div css={SearchResultWrapper}>
            <div css={searchBannerStyle}>
                <p>심심해시에서 다양한 영화를 검색해보세요!</p>
                <SearchBar setKeyword={setKeyword} />
            </div>
            <div>
                {keyword.length === 0 ? (
                    <DefaultMovieList setKeyword={setKeyword} />
                ) : (
                    <SearchedMovieList keyword={keyword} setKeyword={setKeyword} />
                )}
            </div>
        </div>
    );
}

export default SearchPage;
