/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../../components/Poster";
import { getMovieList, addMovie, clearState } from "../../modules/SearchPage/DefaultMovieSlice";

const movieListWrapper = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4vw;
    width: calc(100vw - 20vw);
    margin: 0 auto;
`;

const SpecialMovieList = css`
    height: 18vh;
    width: calc(100vw - 28vw);
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;
    font-size: 1.2rem;
    color: white;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    p {
        line-height: 2rem;
    }

    p:last-of-type {
        font-weight: bold;
        font-size: 1.5rem;
    }

    span {
        color: rgb(246, 45, 168);
    }
`;

function DefaultMovieList({ setKeyword }) {
    const dispatch = useDispatch();
    const { currentMovieList } = useSelector((state) => state.DefaultMovieSlice);

    useEffect(() => {
        //기존에 불러온 영화 리스트가 있다면 api를 호출하지 않는다.
        if (currentMovieList.length === 0) {
            dispatch(clearState());
            dispatch(getMovieList());
        }
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            window.removeEventListener("scroll", infiniteScroll);
        };
    }, []);

    //작품 검색 첫 화면 무한 스크롤 적용
    const infiniteScroll = () => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientTop = document.documentElement.clientHeight;

        if (scrollTop + clientTop >= scrollHeight) {
            dispatch(addMovie());
        }
    };

    return (
        <>
            <div css={SpecialMovieList}>
                <p>#심심해시가 선정한,</p>
                <p>
                    <span>"코로나"</span>가 가장 많이 언급된 영화들🎬
                </p>
            </div>
            <ul css={movieListWrapper}>
                {currentMovieList.map(([key, movie]) => {
                    return (
                        <Poster
                            item={movie}
                            setKeyword={setKeyword}
                            page="search"
                            movie_id={movie.movie_id}
                        />
                    );
                })}
            </ul>
        </>
    );
}

export default DefaultMovieList;
