/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Pagination } from "antd";

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
`;

const paginationStyle = css`
    margin-top: 30px;
    text-align: center;
    .ant-pagination-item:focus-visible,
    .ant-pagination-item:hover a {
        color: rgba(246, 45, 168, 0.93);
    }
    .ant-pagination-item-active {
        background-color: transparent;
        border-color: rgba(246, 45, 168, 0.93);
        a {
            color: rgba(246, 45, 168, 0.93);
        }
    }
    .ant-pagination-item-link {
        &:hover {
            color: rgba(246, 45, 168, 0.93);
        }
    }
    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
    .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
        color: rgba(246, 45, 168, 0.93);
    }
`;

function SearchPage() {
    const [keyword, setKeyword] = useState();
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    useEffect(() => {
        setFilteredMovieList(sample.filter((movie) => movie.title.includes(keyword)));
        setPagination({
            totalPage: target.length / pageSize,
            current: 1,
            minIndex: 0,
            maxIndex: pageSize
        })
    }, [keyword]);

    const target = (filteredMovieList.length >= 1 && filteredMovieList) || sample;

    const pageSize = 10;
    const [pagination, setPagination] = useState({
        totalPage: target.length / pageSize,
        current: 1,
        minIndex: 0,
        maxIndex: pageSize
    });

    const handleChange = (page) => {
        setPagination({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    return (
        <div css={SearchResultWrapper}>
            <div css={searchBannerStyle}>
                <p>심심해시에서 다양한 영화를 검색해보세요!</p>
                <SearchBar setKeyword={setKeyword} />
            </div>
            {(keyword == null && target === sample) ||
            (keyword !== null && target === filteredMovieList) ? (
                <>
                    <ul css={resultStyle}>
                        {target.slice(pagination.minIndex, pagination.maxIndex).map((item) => {
                            return <Poster item={item} setKeyword={setKeyword} page="search" />;
                        })}
                    </ul>
                    <Link to={`/search?page=${pagination.current}`}>
                        <Pagination
                            size="small"
                            pageSize={pageSize}
                            current={pagination.current}
                            total={target.length}
                            onChange={handleChange}
                            css={paginationStyle}
                        />
                    </Link>
                </>
            ) : (
                <p css={noresult}>'{keyword}'에 대한 검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default SearchPage;
