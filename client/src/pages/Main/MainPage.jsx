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

const divStyle = css`
    width: 65rem;
    margin: 0 auto;

    .slick-prev:before {
        opacity: 1;
        color: black;
        left: 0;
    }
    .slick-next:before {
        opacity: 1;
        color: black;
    }
`;

const sliderImgStyle = css`
    width: 204px;
    height: 298px;
    margin: 0 auto;
    border-radius: 8px;

    img {
        width: 100%;
        height: 100%;
        transform: scale(1); //default값
        -webkit-transform: scale(1); ////default값
        -moz-transform: scale(1); //crome
        transition: all 0.2s ease-in-out;

        &:hover {
            transform: scale(1.1); //hover시 확대되는 범위 조정
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
        }
    }
`;

const modalStyle = css`
    display: grid;
    img {
        width: 100px;
        margin: 0 auto;
    }
    .ant-modal {
        width: 500px;
        background-color: #111111;
        color: red;
        /*overflow-y: auto;*/
        /*overflow-x: auto;*/
    }
    .ant-modal-content {
        width: 500px;
        background-color: #111111;
        color: red;
        /*overflow-y: auto;*/
        /*overflow-x: auto;*/
    }
    .ant-modal-body {
        background-color: #111111;
    }
`;

const rateStyle = css`
    font-size: 13px;
`;

const fontStyle = css`
    font-size: 13px;
    color: #ffffff;
`;

const slideStyle = css`
    width: 30%;
`;

const sample = [
    {
        img: "https://movie-phinf.pstatic.net/20211001_121/16330536363187liBB_JPEG/movie_image.jpg",
        title: "007 노 타임 투 다이",
        star: 9.29,
        tag: "#웅장한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210831_152/1630371935224qy9s6_JPEG/movie_image.jpg",
        title: "보이스",
        star: 3.42,
        tag: "#감동적인"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210917_60/16318534287592XLg8_JPEG/movie_image.jpg",
        title: "기적",
        star: 8.49,
        tag: "#재치있는"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210825_8/1629879510900xEwsL_JPEG/movie_image.jpg",
        title: "샹치와 텐 링즈의 전설",
        star: 9.49,
        tag: "#의미있는"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210831_7/1630399407921MTlDg_JPEG/movie_image.jpg",
        title: "스쿨 아웃 포에버",
        star: 6.29,
        tag: "#독특한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210820_122/1629448997924YXUCv_JPEG/movie_image.jpg",
        title: "모가디슈",
        star: 5.29,
        tag: "#화려한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210930_111/1632990544838Hy8aq_JPEG/movie_image.jpg",
        title: "수색자",
        star: 7.29,
        tag: "#멋있는"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210824_61/1629789980296uFIEw_JPEG/movie_image.jpg",
        title: "극장판 포켓몬스터: 정글의 아이, 코코 ",
        star: 5.79,
        tag: "#재미있는"
    }
];

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
                                    {" "}
                                    <img src={item.img} />
                                </div>
                                {/* <p css={fontStyle}>{item.title}</p> */}
                                {/* <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={Math.round(item.star / 2)}
                                    css={rateStyle}
                                /> */}
                                {/* <p css={fontStyle}>{item.tag}</p> */}
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
                <div css={divStyle}>
                    <Slide />
                </div>
                <div>
                    <Button type="primary" onClick={showModal}>
                        더 보기
                    </Button>
                </div>
                <div css={modalStyle}>
                    <Modal
                        title="Basic Modal"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        bodyStyle={{
                            backgroundColor: "#333333"
                        }}
                    >
                        {filteredMovieList.map((item) => {
                            return (
                                <>
                                    <img src={item.img} width="100"></img>
                                    <p css={fontStyle}>{item.title}</p>
                                    <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={Math.round(item.star / 2)}
                                        css={rateStyle}
                                    />
                                    <p css={fontStyle}>{item.tag}</p>
                                </>
                            );
                        })}
                    </Modal>
                </div>
                <SelectedTagList />
                <TagList />
            </div>
        </main>
    );
}
export default MainPage;
