/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const movieInfoWrapper = css`
    height: 330px;
    position: relative;
    margin-bottom: 32px;
    button {
        position: absolute;
        bottom: 0;
        right: 0;
        border: none;
        clear: both;
        background-color: transparent;
        -webkit-text-decoration: underline;
        text-decoration: underline;
    }
`;

const movieInfoContents = css`
    display: flex;
    justify-content: space-around;
    gap: 50px;
`;

const movieInfoSpec = css`
    height: 287px;
    h2 {
        color: white;
        font-size: 2.5rem;
        margin-bottom: 20px;
        font-weight: bold;
    }

    dl {
        line-height: 2.2rem;
        dt {
            font-weight: bold;
            float: left;
            margin-right: 20px;
        }
        dd {
            color: rgba(255, 255, 255, 0.8);
            font-weight: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
`;

function MovieInfo({ movie }) {
    return (
        <div css={movieInfoWrapper}>
            <div css={movieInfoContents}>
                <div>
                    <img src={movie.poster} width="200px" alt={movie.title} />
                </div>
                <div css={movieInfoSpec}>
                    <h2>{movie.title}</h2>
                    <dl>
                        <dt>개요</dt>
                        <dd>
                            <p>
                                <span>{movie.genre}</span>
                                <span>2021.09.20 개봉</span>
                            </p>
                        </dd>
                        <dt>감독</dt>
                        <dd>{movie.director}</dd>
                        <dt>출연</dt>
                        <dd>{movie.actor}</dd>
                        <dt>러닝 타임</dt>
                        <dd>{movie.running_time}</dd>
                        <dt>줄거리</dt>
                        <dd>{movie.summary}</dd>
                    </dl>
                </div>
            </div>
            <button>펼쳐보기</button>
        </div>
    );
}

export default MovieInfo;
