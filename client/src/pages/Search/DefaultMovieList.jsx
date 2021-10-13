/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../../components/Poster";
import {
    getMovieList,
    addMovie,
    clearState
} from "../../modules/SearchPage/DefaultsearchMovieSlice";

const movieListWrapper = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5.3rem 2.5rem;
    justify-items: center;
`;

function DefaultMovieList({ setKeyword }) {
    const dispatch = useDispatch();
    const { currentMovieList } = useSelector((state) => state.searchMovieSlice);

    useEffect(() => {
        dispatch(clearState());
        dispatch(getMovieList());
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            console.log("remove scroll event");
            window.removeEventListener("scroll", infiniteScroll);
        };
    }, []);

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
            <ul css={movieListWrapper}>
                {currentMovieList.map((movie) => {
                    return <Poster item={movie} setKeyword={setKeyword} page="search" />;
                })}
            </ul>
        </>
    );
}

export default DefaultMovieList;
