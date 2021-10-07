/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import { css, jsx } from "@emotion/react";

const headerStyle = css`
    display: flex;
    justify-content: space-between;
    height: 80px;
    line-height: 80px;
    padding: 0 65px;
    border-bottom: 1px solid;
    border-color: #95959500;
    box-shadow: -1px -5px 16px 8px rgb(0 0 0 / 24%);

    a {
        color: rgba(255, 255, 255, 0.8);
        display: block;
    }

    h1 {
        font-size: 1.6rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: bold;
    }
`;

const menuStyle = css`
    display: flex;
    list-style: none;
    justify-content: space-around;
    font-size: 1.25rem;
    li {
        width: 150px;
        text-align: center;
    }
`;

function Header() {
    return (
        <header css={headerStyle}>
            <Link to="/">
                <h1>#심심해시</h1>
            </Link>
            <nav>
                <ul css={menuStyle}>
                    <li>
                        <NavLink to="#">작품 검색</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">어바웃어스</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
