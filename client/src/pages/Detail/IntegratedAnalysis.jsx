/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ShowGraph } from "./ShowGraph";
import { Modal } from "antd";

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
        margin-bottom: 10px;
        text-align: center;
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
    margin: 10px 0 60px 0;
    padding: 20px;
`;

const integratedResultData = css`
    width: 300px;
    height: 300px;

    p {
        text-align: center;
        padding: 40px;
        font-size: 1.5rem;
    }
`;

const integratedReviews = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 20px;
    padding: 40px;
`;

const modalStyle = css`
    .ant-modal-body {
        height: 75vh;
        overflow-y: scroll;
        background-color: #333333;
        display: flex;
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
`;

const viewMore = css`
    cursor: pointer;
    background-color: gray;
    color: white;
    padding: 3px 13px 5px 13px;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;
`;

const IntegratedAnalysis = React.forwardRef(({ movie }, ref) => {
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);
    console.log(Object.entries(movieInfo.total.tags));

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
                <div css={integratedResultData}>
                    <h4>통합 평점</h4>
                    <p>{Math.round(movieInfo.total.score) / 2} / 5</p>
                    <h4>통합 리뷰</h4>
                    <div css={integratedReviews}>
                        {Object.entries(movieInfo.total.tags).map(
                            ([index, tag]) =>
                                Number(index) < 5 && <span css={tagStyle}>#{tag}</span>
                        )}
                        <span onClick={showModal} css={viewMore}>
                            더보기
                        </span>
                    </div>
                </div>
                <Modal
                    title="검색결과 더 보기"
                    width="70vw"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    css={modalStyle}
                    footer={null}
                >
                    {Object.entries(movieInfo.total.tags).map(([index, tag]) => (
                        <span css={tagStyle}>#{tag}</span>
                    ))}
                </Modal>
            </div>
        </div>
    );
});

export default IntegratedAnalysis;
