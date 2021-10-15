/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "antd";

import Poster from "../../components/Poster";
import SearchResultBar from "./SearchResultHeader";
import { setPage } from "../../modules/SearchPage/SearchedMovieSlice";
import { sample } from "../../assets/Sample";

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

const noresult = css`
    color: white;
    text-align: center;
    margin-top: 150px;
`;

const movieListWrapper = css`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4vw;
    width: calc(100vw - 28vw);
    margin: 0 auto;
`;

function SearchedMovieList({ keyword, setKeyword, location }) {
    const pageSize = 12;
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const [pagination, setPagination] = useState({
        totalPage: filteredMovieList.length / pageSize,
        current: 1,
        minIndex: 0,
        maxIndex: pageSize
    });

    const searchParams = new URLSearchParams(location.search);
    const queryPage = searchParams.get("page");

    useEffect(() => {
        if (queryPage > 2) {
            setPagination({
                totalPage: filteredMovieList.length / pageSize,
                current: queryPage,
                minIndex: (queryPage - 1) * pageSize,
                maxIndex: queryPage * pageSize
            });
        }
    }, [queryPage]);

    useEffect(() => {
        setFilteredMovieList(
            sample.filter((movie) =>
                movie.title.replace(/\s/gi, "").includes(keyword.replace(/\s/gi, ""))
            )
        );
    }, [keyword]);

    const handlePageChange = (page) => {
        setPagination({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
        history.push(`/search?keyword=${keyword}&page=${page}`);
        dispatch(setPage({ page }));
    };

    return (
        <>
            <SearchResultBar keyword={keyword} />
            {filteredMovieList.length > 0 ? (
                <>
                    <ul css={movieListWrapper}>
                        {filteredMovieList
                            .slice(pagination.minIndex, pagination.maxIndex)
                            .map((item) => {
                                return <Poster item={item} setKeyword={setKeyword} page="search" />;
                            })}
                    </ul>
                    <Pagination
                        size="small"
                        pageSize={pageSize}
                        current={pagination.current}
                        total={filteredMovieList.length}
                        onChange={handlePageChange}
                        css={paginationStyle}
                    />
                </>
            ) : (
                <p css={noresult}>'{keyword}'에 대한 검색 결과가 없습니다.</p>
            )}
        </>
    );
}

export default SearchedMovieList;
