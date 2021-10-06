import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TagList from "./TagList";
import SelectedTagList from "./SelectedTagList";
import { getMovieListByTag } from "../../modules/MainPage/tagDataSlice";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Modal, Button } from "antd";
import FormItemInput from "antd/lib/form/FormItemInput";

const sample = [
    {
        img: "https://movie-phinf.pstatic.net/20211001_121/16330536363187liBB_JPEG/movie_image.jpg",
        title: "007 노 타임 투 다이",
        star: 7.29,
        tag: "#웅장한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210831_152/1630371935224qy9s6_JPEG/movie_image.jpg",
        title: "보이스",
        star: 6.42,
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
        star: 7.29,
        tag: "#의미있는"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210831_7/1630399407921MTlDg_JPEG/movie_image.jpg",
        title: "스쿨 아웃 포에버",
        star: 7.29,
        tag: "#독특한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210820_122/1629448997924YXUCv_JPEG/movie_image.jpg",
        title: "모가디슈",
        star: 7.29,
        tag: "#화려한"
    },
    {
        img: "https://movie-phinf.pstatic.net/20210930_111/1632990544838Hy8aq_JPEG/movie_image.jpg",
        title: "수색자",
        star: 7.29,
        tag: "#멋있는"
    },
    {
        img: "https://movie-phinf.pstatic.net/20211001_121/16330536363187liBB_JPEG/movie_image.jpg",
        title: "포켓몬스터: 정글의 아이, 코코",
        star: 7.29,
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
    }, [selectedTagList]);

    const Slide = () => {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,

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

        return (
            <>
                <Slider {...settings}>
                    {filteredMovieList.map((item) => {
                        return (
                            <>
                                <img src={item.img} width="400"></img>
                                {item.title}
                                <br />
                                {item.star}
                                <br />
                                {item.tag}
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
                <h1>#심심해시</h1>
                <p>태그를 선택하여 새로운 영화 취향을 발견해보세요!</p>
            </div>
            <div>
                <Slide />
                <Button type="primary" onClick={showModal}>
                    더 보기
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {filteredMovieList.map((item) => {
                        return (
                            <>
                                <img src={item.img} width="400"></img>
                                {item.title}
                                <br />
                                {item.star}
                                <br />
                                {item.tag}
                            </>
                        );
                    })}
                </Modal>
                <SelectedTagList />
                <TagList />
            </div>
        </main>
    );
}
export default MainPage;
