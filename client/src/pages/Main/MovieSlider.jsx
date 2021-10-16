/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Rate } from "antd";
import { sample } from "../../assets/Sample";

import { Spin } from "antd";

/* 영화 포스터 슬라이더 */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* 영화 포스터 로딩 시, 레이지 로딩 적용 */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const sliderWrapperStyle = css`
    width: 900px;
    height: 195px;
    margin: 0 auto;

    .slick-prev:before,
    .slick-next:before {
        opacity: 1;
        color: #45464b;
        font-size: 35px;
    }
`;

const sliderImgStyle = css`
    position: relative;
    background-color: #222222;
    width: 60%;
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        transition: all 0.2s ease-in-out;
    }

    &:hover div {
        z-index: 1;
        visibility: visible;
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
    }

    &:hover img {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
    }
`;

const sliderImgLayerStyle = css`
    z-index: -1;
    visibility: hidden;
    display: grid;
    background-color: rgb(30 30 30 / 75%);
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 0.5rem;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
`;

const rateStyle = css`
    font-size: 0.8rem;
`;

const fontStyle = css`
    font-size: 1.15rem;
    font-weight: bold;
    color: #ffffff;
`;

const loadingWrapper = css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
`;

function MovieSlider() {
    const { movieList, loading } = useSelector((state) => state.mainTagDataSlice);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        lazyLoad: true,
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

    // const target = (movieList.length >= 1 && movieList) || sample;
    return (
        <div css={sliderWrapperStyle}>
            {loading ? (
                <>
                    <div css={loadingWrapper}>
                        <p>심심해시의 영화를 불러오는 중입니다..</p>
                    </div>
                </>
            ) : (
                <Slider {...settings}>
                    {movieList.slice(0, 24).map(([key, movie]) => {
                        return (
                            <>
                                <div css={sliderImgStyle}>
                                    <Link
                                        to={`/movie/${
                                            movie.movie_id === undefined ? movie.id : movie.movie_id
                                        }`}
                                    >
                                        <LazyLoadImage
                                            effect="blur"
                                            src={movie.poster}
                                            alt={movie.title}
                                            key={
                                                movie.movie_id === undefined
                                                    ? movie.id
                                                    : movie.movie_id
                                            }
                                        />
                                        <div css={sliderImgLayerStyle}>
                                            <p css={fontStyle}>{movie.title}</p>
                                            <Rate
                                                disabled
                                                allowHalf
                                                value={Math.round(movie.score) / 2}
                                                css={rateStyle}
                                            />
                                            <p css={fontStyle}>{Math.round(movie.score) / 2}</p>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
}

export default MovieSlider;
