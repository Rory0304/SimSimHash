/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieInfo from "./MovieInfo";
import IntegratedAnalysis from "./IntegratedAnalysis";
import PlatformAnalysis from "./PlatformAnalysis";
import { Button } from "antd";
import { sample } from "../../assets/Sample";

const detailPageWrapper = css`
    font-size: 1.15rem;
    color: #ffffff;

    width: 65%;
    margin: 0 auto;
    padding: 50px 0;
`;

const tabStyle = css`
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 40px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;

    li {
        height: 40px;
        width: 120px;
        line-height: 40px;
        text-align: center;

        a {
            display: block;
            color: #fff;
        }
    }
`;

const getMovieById = (id) => {
    const array = sample.filter((movie) => String(movie.id) === id);

    if (array.length === 1) {
        return array[0];
    }
    return null;
};

const DetailPage = ({ history, match }) => {
    const [movie, setMovie] = useState({});
    const { id } = match.params;

    useEffect(() => {
        setMovie(getMovieById(id));
    }, []);

    return (
        <div css={detailPageWrapper}>
            <MovieInfo movie={movie} />

            <ul css={tabStyle}>
                <li>
                    <Link to="#integrateArea">통합 분석</Link>
                </li>
                <li>
                    <Link to="#platformArea">플랫폼 분석</Link>
                </li>
            </ul>
            <IntegratedAnalysis movie={movie} />
            <PlatformAnalysis movie={movie} />
            <Button onClick={() => history.goBack()}>목록으로 돌아가기</Button>
        </div>
    );
};

export default DetailPage;
