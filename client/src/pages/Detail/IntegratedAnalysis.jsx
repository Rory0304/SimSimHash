/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ShowGraph } from "./ShowGraph";
import { Modal, Rate } from "antd";

const integrateAreaWrapper = css`
    h3 {
        color: #fff;
        font-size: 2.3rem;
        font-weight: bold;
        margin: 40px 0;
    }

    h4 {
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
    }
`;

const tagStyle = ({ sample }) => css`
    color: #fff;
    padding: 3px 13px 5px 13px;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;
    background: ${sample
        ? "linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93))"
        : "#45464b"};
    color: #fff;
`;

const integratedResultWrapper = css`
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #222222;
    border-radius: 20px;
`;

const integratedContentsLeft = css`
    width: 50%;
    border-right: 1px solid #525355;
`;

const integratedContentsRight = css`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
        text-align: center;
        font-size: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const integratedReviews = css`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 20px;
`;

const modalStyle = css`
    .ant-modal-body {
        overflow-y: scroll;
        background-color: #333333;
        display: flex;
        row-gap: 20px;
        flex-wrap: wrap;
        justify-content: flex-start;
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

const rateStyle = css`
    font-size: 13px;
`;

const IntegratedAnalysis = React.forwardRef(({ movie }, ref) => {
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);
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
                <div css={integratedContentsLeft}>
                    <ShowGraph
                        labels={["네이버", "다음", "왓챠", "씨네21"]}
                        noreviewarr={[
                            movieInfo.platform_summary.naver_count,
                            movieInfo.platform_summary.daum_count,
                            movieInfo.platform_summary.watcha_count,
                            movieInfo.platform_summary.cine21_count
                        ]}
                    />
                </div>
                <div css={integratedContentsRight}>
                    <div>
                        <h4>통합 평점</h4>
                        <p>
                            {Math.round(movieInfo.total.score) / 2}점 / 5점
                            <Rate
                                disabled
                                allowHalf
                                value={Math.round(movieInfo.total.score) / 2}
                                css={rateStyle}
                            />
                        </p>
                    </div>
                    <div>
                        <h4>통합 리뷰</h4>
                        <div css={integratedReviews}>
                            {Object.entries(movieInfo.total.tags).map(
                                ([index, tag]) =>
                                    Number(index) < 5 && (
                                        <span css={tagStyle({ sample: true })}>#{tag}</span>
                                    )
                            )}
                            <span onClick={showModal} css={viewMore}>
                                더보기
                            </span>
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
                                    <span css={tagStyle({ sample: false })}>#{tag}</span>
                                ))}
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default IntegratedAnalysis;
