/** @jsxImportSource @emotion/react */
import { lazy, Suspense } from "react";

import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

import { Rate } from "antd";

const posterWrapperStyle = ({ page }) => css`
    width: ${page === "main" ? "11rem" : "17rem"};
    border-radius: 17px;
    background-color: #2c313f;
    transition: 0.3s ease-in-out;

    ${page === "search" &&
    `&:hover {
        transform: translateY(-24px);
        box-shadow: 0px 17px 12px 3px #00000030;

        p {
            color: rgba(246, 45, 168, 0.93);
        }
    }`}

    a {
        display: block;
    }
`;

const imgStyle = ({ page }) => css`
    text-align: center;
    width: ${page === "main" ? "11rem" : "17rem"};

    img {
        width: 100%;
        border-radius: 12px 12px 0 0;
    }
`;

const rateStyle = css`
    font-size: 13px;
`;

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
    height: ${page === "main" ? "257px" : "289px"};
    content: "";
    background-color: #3f4555d6;
`;

const laztTextStyle = css`
    width: 135px;
    height: 25px;
    background-color: #3f4555d6;
    animation: pulseanim 1.2s ease-in-out infinite;

    @keyframes pulseanim {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;

const LazyImage = lazy(() => import("./LazyImage"));
const LazyText = lazy(() => import("./LazyText"));

function Poster({ item, setKeyword, page }) {
    return (
        <li css={posterWrapperStyle({ page: page })}>
            <div>
                {page === "search" && <form onChange={(e) => setKeyword(e.target.value)} />}
                <Link to={`/movie/${item.id}`}>
                    <div css={imgStyle({ page: page })}>
                        <Suspense fallback={<div css={lazyImageStyle({ page: page })} />}>
                            <LazyImage src={item.img} alt={item.title} />
                        </Suspense>
                    </div>
                    <div css={movieInfoStyle}>
                        <Suspense fallback={<p css={laztTextStyle}></p>}>
                            <LazyText text={item.title} />
                        </Suspense>
                        {page === "search" && (
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={Math.round(item.score / 2)}
                                css={rateStyle}
                            />
                        )}
                        <Suspense fallback={<p css={laztTextStyle}></p>}>
                            <LazyText text={item.tag} />
                        </Suspense>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Poster;
