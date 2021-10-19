/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Pie } from "react-chartjs-2";

const graphStyle = css`
    width: 300px;
    height: 300px;
    margin: 0 auto;
`;

export const ShowGraph = ({ labels, noreviewarr }) => {
    const { movieInfo } = useSelector((state) => state.movieInfoSlice);

    const data = {
        labels: ["네이버", "다음", "왓챠", "씨네21"],
        datasets: [
            {
                label: "# 명 참여",
                data: [
                    movieInfo.platform_summary.naver_count,
                    movieInfo.platform_summary.daum_count,
                    movieInfo.platform_summary.watcha_count,
                    movieInfo.platform_summary.cine21_count
                ],
                backgroundColor: [
                    "rgb(23 175 61 / 34%)",
                    "rgb(65 45 246 / 34%)",
                    "rgb(246 45 168 / 34%)",
                    "rgb(173 35 35 / 34%)"
                ],
                borderColor: [
                    " rgba(23, 175, 61, 0.93)",
                    "rgba(65, 45, 246, 0.93)",
                    "rgba(246, 45, 168, 0.93)",
                    "rgba(173, 35, 35, 0.93)"
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <>
            <h4>플랫폼 별 리뷰 수</h4>
            <div css={graphStyle}>
                <Pie data={data} />
            </div>
        </>
    );
};
