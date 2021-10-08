/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

import { Rate } from "antd";

const posterWrapperStyle = css`
    width: 17rem;
    border-radius: 17px;
    background-color: #2c313f;
    transition: 0.3s ease-in-out;

    &:hover {
        transform: translateY(-24px);
        box-shadow: 0px 17px 12px 3px #00000030;

        p {
            color: rgba(246, 45, 168, 0.93);
        }
    }
`;

const imgStyle = css`
    width: 100%;
    border-radius: 12px 12px 0 0;
    text-align: center;
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

function Poster({ item, setKeyword }) {
    return (
        <li css={posterWrapperStyle}>
            <div>
                <form onChange={(e) => setKeyword(e.target.value)} />
                <Link to={`/movie/${item.id}`}>
                    <img src={item.img} css={imgStyle} alt={item.title} />
                    <div css={movieInfoStyle}>
                        <div>
                            <p>{item.title}</p>
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={Math.round(item.star / 2)}
                                css={rateStyle}
                            />
                        </div>
                        <p>
                            <span>{item.tag}</span>
                        </p>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Poster;
