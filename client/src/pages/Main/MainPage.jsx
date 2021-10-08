/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TagList from "./TagList";
import SelectedTagList from "./SelectedTagList";
import MainIntro from "./MainIntro";
import MovieSlider from "./MovieSlider";
import MovieListModal from "./MovieListModal";
import { getMovieListByTag } from "../../modules/MainPage/tagDataSlice";

import { TagFilled } from "@ant-design/icons";

const selectedInfo = css`
    font-size: 1.25rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin: 35px 0 15px 0;
`;

function MainPage() {
    const dispatch = useDispatch();
    const { selectedTagList, movieList } = useSelector((state) => state.mainTagDataSlice);

    useEffect(() => {
        const debounce = setTimeout(() => {
            return dispatch(getMovieListByTag());
        }, 1000);
        return () => {
            clearTimeout(debounce);
        };
    }, [selectedTagList]);

    return (
        <main>
            <div>
                <MainIntro />
            </div>
            <div>
                <MovieListModal />
                <MovieSlider />
                <p css={selectedInfo}>
                    <TagFilled style={{ color: "#fff", marginRight: "0.625rem" }} />
                    {selectedTagList.length < 2
                        ? "해시태그를 2개 이상 선택하세요!"
                        : `해당 키워드를 가진 영화의 개수는 ${movieList.length}개 입니다.`}
                </p>
                <SelectedTagList />
                <TagList />
            </div>
        </main>
    );
}
export default MainPage;
