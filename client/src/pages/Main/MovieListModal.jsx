/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Modal, Rate } from "antd";
import { css, jsx } from "@emotion/react";

const buttonDivStyle = css`
    width: 65rem;
    margin: 0 auto;
    text-align: right;
`;

const buttonStyle = css`
    color: rgba(246, 45, 168, 0.93);
`;

const modalStyle = css`
    width: 150px;
    padding: 10px;
    border-radius: 15px;
    background-color: #444444;
    text-align: center;
    margin-right: 15px;
    margin-left: 15px;
`;

const rateStyle = css`
    font-size: 0.8rem;
`;

const fontStyle = css`
    font-size: 1.15rem;
    font-weight: bold;
    color: #ffffff;
`;

function MovieListModal() {
    const dispatch = useDispatch();
    const { movieList } = useSelector((state) => state.mainTagDataSlice);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div css={buttonDivStyle}>
                <Button type="text" onClick={showModal} css={buttonStyle}>
                    더 보기
                </Button>
            </div>
            <Modal
                title="검색결과 더 보기"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width="800px"
                bodyStyle={{
                    backgroundColor: "#333333",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    rowGap: "30px"
                }}
                footer={null}
            >
                {movieList.map((item) => {
                    return (
                        <div css={modalStyle}>
                            <Link to={`/movie/${item.id}`}>
                                <img src={item.poster} width="100" alt={item.title} />
                                <p css={fontStyle}>{item.title}</p>
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={Math.round(item.score / 2)}
                                    css={rateStyle}
                                />
                                <p css={fontStyle}>{item.total}</p>
                            </Link>
                        </div>
                    );
                })}
            </Modal>
        </div>
    );
}

export default MovieListModal;
