/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import { ShowGraph } from './ShowGraph';

import { css, jsx } from "@emotion/react";

import { Rate, Button } from "antd";
import { sample } from "../../assets/Sample";

const fontStyle = css`
    font-size: 1.15rem;
    font-weight: bold;
    color: #ffffff;
`;

const rateStyle = css`
    font-size: 0.8rem;
`;

const getMovieById = (id) => {
    const array = sample.filter(movie => movie.id == id);
    if (array.length == 1) {
        return array[0];
    }
    return null;
}

const DetailPage = ({ history, match }) => {
    const [ movie, setMovie ] = useState({});
    const { id } = match.params;
    
    useEffect(() => {
        setMovie(getMovieById(id));
    }, []);
    
    return (
        <>
            <div>
                {
                    movie ? (
                    <div css={fontStyle}>
                        <div>
                            <dt>영화 번호</dt>
                            <dd>{ movie.id }</dd>
                        </div>
                        <div>
                            <dt>제목</dt>
                            <dd>{ movie.title }</dd>
                        </div>
                        <div>
                            <dt>포스터</dt>
                            <dd><img src={movie.img} width="300px" /></dd>
                        </div>
                        <div>
                            <dt>평점</dt>
                            <dd>
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={Math.round(movie.star / 2)}
                                    css={rateStyle}
                                />
                            </dd>
                        </div>
                        <div>
                            <dt>감독</dt>
                            <dd>{ movie.director }</dd>
                        </div>
                        <div>
                            <dt>배우</dt>
                            <dd>{ movie.actor }</dd>
                        </div>
                        <div>
                            <dt>줄거리</dt>
                            <dd>
                                { movie.story}
                            </dd>
                        </div>
                        <div>
                            <ShowGraph movie={movie} />
                        </div>
                    </div>
                    ) : '해당 영화를 찾을 수 없습니다.'
                }
                <Button onClick={() => history.goBack()}>목록으로 돌아가기</Button>
            </div>
        </>
    )
}
    
export default DetailPage;