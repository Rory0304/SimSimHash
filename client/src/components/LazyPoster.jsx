/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React from "react";

import { useLazyImageHandler } from "../hook/useLazyImageHandler";
import { Rate } from "antd";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const movieInfoStyle = css`
    padding: 7px 20px;

    p {
        margin: 14px 0;
        color: #ffffff;
    }

    p:first-of-type {
        font-size: 1.4rem;
        font-weight: bold;
    }

    p:last-of-type {
        font-size: 1rem;
    }
`;

const lazyImageStyle = ({ page }) => css`
    width: 100%;
    height: ${page === "main" ? "251px" : "389px"};
    border-radius: 12px 12px 0 0;
    background-color: #3f4555d6;
`;

const rateStyle = css`
    font-size: 13px;
`;

function LazyPoster({ page, item }) {
    let { imgSrc, imgRef } = useLazyImageHandler({ src: item.poster });

    return (
        <>
            <div css={lazyImageStyle({ page })}>
                <div ref={imgRef}>
                    <LazyLoadImage
                        effect="opacity"
                        src={`${imgSrc}?type=m203_290_2`}
                        placeholderSrc={item.poster}
                        alt={item.title}
                        style={{
                            width: page === "main" ? "11rem" : "17rem",
                            height: page === "main" ? "251px" : "389px"
                        }}
                    />
                </div>
            </div>
            <div css={movieInfoStyle}>
                <p>{item.title}</p>
                {page === "search" && (
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={Math.round(item.score / 2)}
                        css={rateStyle}
                    />
                )}
                <p>{item.total}</p>
            </div>
        </>
    );
}

export default LazyPoster;
