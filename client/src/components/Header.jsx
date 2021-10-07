/** @jsxImportSource @emotion/react */
import { Link, NavLink } from "react-router-dom";
import { css, jsx } from "@emotion/react";

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

const headerStyle = css`
    display: flex;
    justify-content: space-between;
    height: 74px;
    line-height: 74px;
    padding: 0 28px;
`;

const menuStyle = css`
    display: flex;
    list-style: none;
    justify-content: space-around;

    li {
        width: 100px;
        text-align: center;
    }
`;

export default Header;
