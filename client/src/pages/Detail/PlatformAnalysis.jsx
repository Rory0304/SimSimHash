/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React from "react";

const platformAreaWrapper = css`
    h3 {
        color: #fff;
        font-weight: bold;
        font-size: 2.3rem;
    }
`;

const platformBox = css`
    background-color: #222222;
    color: #fff;
    width: 90%;
    margin: 20px auto;
    padding: 30px;
    line-height: 3rem;
    border-radius: 20px;

    h4 {
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const platformBoxHeader = css`
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const tagStyle = ({ name }) => css`
    color: #fff;
    padding: 3px 13px 5px 13px;
    border-radius: 20px;
    text-align: center;

    ${name === "네이버" &&
    ` border: 1px solid rgba(23, 175, 61, 0.93);
    background-color: rgb(23 175 61 / 34%);`}

    ${name === "왓챠" &&
    ` border: 1px solid rgba(246, 45, 168, 0.93);
    background-color: rgb(246 45 168 / 34%);`}

    ${name === "다음" &&
    ` border: 1px solid rgba(65, 45, 246, 0.93);
    background-color: rgb(65 45 246 / 34%);`}

    ${name === "씨네21" &&
    ` border: 1px solid rgba(173, 35, 35, 0.93);
    background-color: rgb(173 35 35 / 34%);`}
`;

function PlatformBox({ name, score, wholeScore, noreview, tag }) {
    return (
        <div css={platformBox}>
            <div css={platformBoxHeader}>
                <h4>{name}</h4>
                <p>
                    {score}점 / {wholeScore}점 <span>({noreview}명 참여)</span>
                </p>
            </div>
            <div>
                <p>
                    <span css={tagStyle({ name: name })}>{tag}</span>
                </p>
            </div>
        </div>
    );
}
function PlatformAnalysis({ movie }) {
    return (
        <div id="platformArea" css={platformAreaWrapper}>
            <h3>플랫폼 별 분석</h3>
            <div>
                <PlatformBox
                    name="네이버"
                    score={4.8}
                    wholeScore={10}
                    noreview={137}
                    tag={"웅장한"}
                />
                <PlatformBox name="왓챠" score={4.8} wholeScore={10} noreview={12} tag={"웅장한"} />
                <PlatformBox name="다음" score={4.8} wholeScore={10} noreview={20} tag={"웅장한"} />
                <PlatformBox
                    name="씨네21"
                    score={4.8}
                    wholeScore={10}
                    noreview={147}
                    tag={"웅장한"}
                />
            </div>
        </div>
    );
}

export default PlatformAnalysis;
