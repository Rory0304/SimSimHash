/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ShowGraph } from "./ShowGraph";

const integrateAreaWrapper = css`
    h3 {
        color: #fff;
        font-size: 2.3rem;
        font-weight: bold;
    }

    h4 {
        color: #fff;
        font-size: 1.3rem;
        font-weight: bold;
    }
`;

const tagStyle = css`
    color: #fff;
    padding: 3px 13px 5px 13px;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;
    background: linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93));
    color: #fff;
`;

const integratedResultWrapper = css`
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
    padding: 20px;
`;

const IntegratedAnalysis = React.forwardRef(({ movie }, ref) => {
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);
    console.log(movieInfo.total.tags);
    return (
        <div css={integrateAreaWrapper} ref={ref}>
            <h3>통합 분석</h3>
            <div css={integratedResultWrapper}>
                <ShowGraph
                    labels={["네이버", "다음", "왓챠", "씨네21"]}
                    noreviewarr={[
                        movieInfo.platform_summary.naver_count,
                        movieInfo.platform_summary.daum_count,
                        movieInfo.platform_summary.watcha_count,
                        movieInfo.platform_summary.cine21_count
                    ]}
                />
                <div>
                    <h4>통합 평점</h4>
                    <p>{Math.round(movieInfo.total.score) / 2}</p>
                    <h4>통합 리뷰</h4>
                    {/* <div>
                        {movieInfo.total.tags.map((tag, index) => {
                            index < 5 && <span css={tagStyle}>{tag}</span>;
                        })}
                    </div> */}
                </div>
            </div>
        </div>
    );
});

export default IntegratedAnalysis;
