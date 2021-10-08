/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

import { Rate } from "antd";

const posterWrapperStyle = css`
    width: 17rem;
    border-radius: 15px;
    background-color: #444444;
    padding: 20px 0;
`;

const imgStyle = css`
    height: 298px;
    text-align: center;
`;

const rateStyle = css`
    margin-top: 20px;
    font-size: 13px;
`;

const movieInfoStyle = css`
    p {
        margin-top: 20px;
        font-size: 1.25rem;
        color: #ffffff;
    }

    p:last-of-type {
        font-size: 1rem;
    }
`;

function Poster({ item, setKeyword }) {
    return (
        <div css={posterWrapperStyle}>
            <form onChange={(e) => setKeyword(e.target.value)} />
            <Link to={`/movie/${item.id}`}>
                <img src={item.img} css={imgStyle} alt={item.title} />
                <div css={movieInfoStyle}>
                    <p>{item.title}</p>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={Math.round(item.star / 2)}
                        css={rateStyle}
                    />
                    <p>{item.tag}</p>
                </div>
            </Link>
        </div>
    );
}

export default Poster;
