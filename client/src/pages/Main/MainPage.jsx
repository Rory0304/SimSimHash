/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TagList from "./TagList";
import SelectedTagList from "./SelectedTagList";
import MainIntro from "./MainIntro";
import { getMovieListByTag } from "../../modules/MainPage/tagDataSlice";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Modal, Rate } from "antd";
import { TagFilled } from "@ant-design/icons";

import { sample } from "./Sample";

const buttonDivStyle = css`
    width: 65rem;
    margin: 0 auto;
    text-align: right;
`

const buttonStyle = css`
    color: rgba(246, 45, 168, 0.93);
`

const divStyle = css`
    width: 65rem;
    margin: 0 auto;

    .slick-prev:before,
    .slick-next:before {
        opacity: 1;
        color: #45464b;
        font-size: 35px;
    }
`;

const sliderImgLayerStyle = css`
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    transform: scale(1); //default값
    -webkit-transform: scale(1); ////default값
    -moz-transform: scale(1); //crome
`;

const sliderImgStyle = css`
    position: relative;
    width: 180px;
    height: 260px;
    margin: 0 auto;

    &:hover div {
        display: grid;
        background-color: rgb(30 30 30 / 75%);
        align-items: center;
        align-content: center;
        justify-content: center;
        gap: 0.5rem;
        transform: scale(1.1); //hover시 확대되는 범위 조정
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
    }

    &:hover img {
        transform: scale(1.1); //hover시 확대되는 범위 조정
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
    }

    &:hover div {
            display: grid;
            background-color: rgb(30 30 30 / 75%);
            align-items: center;
            align-content: center;
            justify-content: center;
        }
    }

    img {
        width: 100%;
        height: 100%;
        transform: scale(1); //default값
        -webkit-transform: scale(1); ////default값
        -moz-transform: scale(1); //crome
        transition: all 0.2s ease-in-out;
    }
`;

const modalStyle = css`
    width: 150px;
    padding: 10px;
    border-radius: 15px;
    background-color: #444444;
    text-align: center;
    margin-right: 15px;
    margin-left: 15px;
`

const rateStyle = css`
    font-size: 0.8rem;
`;

const fontStyle = css`
    font-size: 1.15rem;
    font-weight: bold;
    color: #ffffff;
`;

const selectedInfo = css`
    font-size: 1.25rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin: 14px 0;
`;

function MainPage() {
    const dispatch = useDispatch();
    const { selectedTagList } = useSelector((state) => state.mainTagDataSlice);
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            return dispatch(getMovieListByTag());
        }, 1000);
        return () => {
            clearTimeout(debounce);
        };
    }, [selectedTagList]);

    useEffect(() => {
        const filter = [];
        selectedTagList.map((item) => {
            filter.push(item.name);
        });
        setFilteredMovieList(sample.filter((movie) => filter.includes(movie.tag)));
        console.log(filter);
    }, [selectedTagList]);

    const Slide = () => {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            // variableWidth: true,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const target = (filteredMovieList.length >= 1 && filteredMovieList) || sample;

        return (
            <>
                <Slider {...settings}>
                    {target.map((item) => {
                        return (
                            <>
                                <div css={sliderImgStyle}>
                                    <img src={item.img} />
                                    <div css={sliderImgLayerStyle}>
                                        <p css={fontStyle}>{item.title}</p>
                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={Math.round(item.star / 2)}
                                            css={rateStyle}
                                        />
                                        <p css={fontStyle}>{item.tag}</p>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </Slider>
            </>
        );
    };

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
        <main>
            <div>
                <MainIntro />
            </div>
            <div>
                <div css={buttonDivStyle}>
                    <Button type="text" onClick={showModal} css={buttonStyle}>
                        더 보기
                    </Button>
                </div>
                <div css={divStyle}>
                    <Slide />
                </div>
                <div>
                    <Modal
                        title="검색결과 더 보기"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width='800px'
                        bodyStyle={{
                            backgroundColor: '#333333',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            rowGap: '30px'
                        }}
                        footer={null}
                    >
                        {filteredMovieList.map((item) => {
                            return (
                                <div css={modalStyle}>
                                    <img src={item.img} width="100"></img>
                                    <p css={fontStyle}>{item.title}</p>
                                    <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={Math.round(item.star / 2)}
                                        css={rateStyle}
                                    />
                                    <p css={fontStyle}>{item.tag}</p>
                                </div>
                            );
                        })}
                    </Modal>
                </div>
                <p css={selectedInfo}>
                    <TagFilled style={{ color: "#fff", marginRight: "0.625rem" }} />
                    {selectedTagList.length < 2
                        ? "해시태그를 2개 이상 선택하세요!"
                        : `해당 키워드를 가진 영화의 개수는 ${filteredMovieList.length}개 입니다.`}
                </p>
                <SelectedTagList />
                <TagList />
            </div>
        </main>
    );
}
export default MainPage;
