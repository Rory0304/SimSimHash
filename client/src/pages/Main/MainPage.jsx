import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { Tag, Modal, Button } from "antd";
import FormItemInput from "antd/lib/form/FormItemInput";
// import { ReloadOutlined } from "@ant-design/icons";

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
]

function MainPage() {
    const [tagList, setTagList] = useState([]);
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    const { CheckableTag } = Tag;

    useEffect(() => {
        /* 백엔드로부터 태그 리스트 받아오기: 태그 번호로 받아오면 좋을 듯 */
        const requested = [
            { key: 1, name: "#재미있는" },
            { key: 2, name: "#독특한" },
            { key: 3, name: "#유쾌한" },
            { key: 4, name: "#감동적인" },
            { key: 5, name: "#의미있는" },
            { key: 6, name: "#재치있는" },
            { key: 7, name: "#웅장한" },
            { key: 8, name: "#멋있는" },
            { key: 9, name: "#거대한" }
        ];
        setTagList(requested);
    }, []);

    useEffect(() => {
        const filter = [];
        selectedTagList.map((item) => {
            filter.push(item.name)
        });
        setFilteredMovieList(sample.filter(movie => 
            filter.includes(movie.tag)))
    }, [selectedTagList]);

    const onSelectTag = (tag) => {
        setSelectedTagList((current) => [...current, tag]);
    };

    const onRemoveSelectedTag = (tagIndex) => {
        const filterTag = selectedTagList.filter((item) => item.key !== tagIndex);
        setSelectedTagList(filterTag);
    };

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
                                {item.title}<br />
                                {item.star}<br />
                                {item.tag}
                            </>
                        )
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
            <header>
                <h1>#심심해시</h1>
                <p>태그를 선택하여 새로운 영화 취향을 발견해보세요!</p>
            </header>
            <div>
                <Slide />
                <Button type="primary" onClick={showModal}>
                    더 보기
                </Button>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {filteredMovieList.map((item) => {
                        return (
                            <>
                                <img src={item.img} width="400"></img>
                                {item.title}<br />
                                {item.star}<br />
                                {item.tag}
                            </>
                        )
                    })}
                </Modal>
                {/* 선택된 태그 리스트 */}
                <div>
                    {selectedTagList.map((selectedTag) => (
                        <Tag
                            color="geekblue"
                            key={selectedTag.key}
                            onClose={() => onRemoveSelectedTag(selectedTag.key)}
                            closable
                        >
                            {selectedTag.name}
                        </Tag>
                    ))}
                </div>

                {/* 태그 리스트 */}
                <div>
                    {tagList.map((tag) => (
                        <CheckableTag
                            key={tag.key}
                            onClick={() => onSelectTag(tag)}
                            checked={selectedTagList.indexOf(tag) > -1}
                        >
                            {tag.name}
                        </CheckableTag>
                    ))}
                </div>
            </div>
        </main>
    );
}
export default MainPage;
