/** @jsxImportSource @emotion/react */

import React from "react";
import { css, jsx } from "@emotion/react";

const divStyle = css`
    background-color: #95959500;
    padding: 100px 30%;
    margin: 0 auto;
    color: white;
    font-size: 20px;
    dt {
        margin-bottom: 10px;
    }
    dd {
        margin-bottom: 60px;
    }
`;

const Introduce = () => {
    return (
        <div>
            <dl>
                <dt>웹 서비스 개요</dt>
                <dd>#심심 해시는 여러 곳의 영화 리뷰 사이트에서 평점과 리뷰         데이터를 모아 분석을 진행하고 시각화하여 이용자에게 한눈에 비교 분석할 방법을 제공합니다.
첫째로, 저희 서비스는 여러 웹사이트에서 모은 데이터를 통합하여 분석하기 때문에 편향성을 줄일 수 있습니다.
둘째로, 하나의 영화에 대한 데이터를 분석한 결과를 한 페이지에서 핵심 키워드, 워드 클라우드, 도표 등으로 시각화하여 제공하기 때문에 이용자가 한눈에 비교할 수 있고 시간을 절약할 수 있습니다.
마지막으로 이미 어떤 영화에 대해 찾아볼지를 알고 있는 이용자가 아니더라도 핵심 키워드를 활용한 필터링 기능을 통해 이용자의 취향에 맞는 작품을 찾을 수 있습니다.
                </dd>
                <dt>프로젝트 목표</dt>
                <dd>OTT 서비스에서 제공하는 콘텐츠 분류 방법이나 검색 기능, 추천 알고리즘의 불편함을 해결합니다.
OTT 서비스와 관련된 데이터를 바탕으로 이용자에게 특정 콘텐츠 관련 해시태그로 표현된 핵심 키워드 및 웹 사이트별 통합된 리뷰 정보를 제공한다면, 더욱 더 간편하고 개인화된 취향의 작품을 발견할 수 있고, 기존 문제점에 대한 해결책이 될 수 있습니다.
코로나 전후 상황을 비교했을 때 특정 콘텐츠에 대한 선호도나 이용자들의 평가와 반응에서 뚜렷한 차이를 발견한다면, 코로나 시대 유의미한 인사이트를 제공할 수 있을 것입니다.
                </dd>
                <dt>프로젝트 팀원 역할 분담</dt>
                <dd>
                    <dt>박정윤</dt>
                    <dd>팀장/데이터 분석</dd>
                    <dt>사은수</dt>
                    <dd>프론트엔드 개발</dd>
                    <dt>송성곤</dt>
                    <dd>백엔드 개발/데이터 분석</dd>
                    <dt>박지호</dt>
                    <dd>프론트엔드 개발/데이터 분석</dd>
                    <dt>김수연</dt>
                    <dd>데이터 분석</dd>
                    <dt>김가원</dt>
                    <dd>백엔드 개발//데이터 분석</dd>
                </dd>
            </dl>
        </div>
    )
}

function AboutPage() {

    return (
        <div css={divStyle} >
            <Introduce />
        </div>
    )
}

export default AboutPage;
