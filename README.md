# #심심해시
해시태그로 표현하는 유저의 감정 취향 분석 서비스

## 1. 프로젝트 소개
### 사용 데이터  
[네이버](https://movie.naver.com/)  
[다음](https://movie.daum.net/main)  
[왓챠피디아](https://pedia.watcha.com/ko-KR)  
[씨네21](http://www.cine21.com/)  

사이트 크롤링을 통해 작품에 대한 정보, 리뷰 데이터 수집

### 기술 스택 & 사용된 라이브러리
Python  
Jupyter  
Javascript  
MySQL  
Flask  
Numpy  
Pandas  
Matplotlib  
Seaborn  

### 웹 서비스 개요
포스트 코로나 시대에 사회적 거리 두기 및 사람이 밀집되는 공간을 피하려는 사람들의 니즈와 OTT 서비스가 제공하는 편리함이 시너지 효과를 내어 한국에서도 OTT 서비스의 가입자가 급증하는 현상이 나타나고 있습니다. 또한 코로나 상황이 잘 통제되는 상황에 접어들어 OTT 서비스의 이용자가 감소하더라도, 여전히 OTT 서비스에 대한 니즈가 있을 것이라고 예상됩니다.
OTT 서비스는 이용자가 안전하고 편안한 공간에서 이용할 수 있고, 기존의 다른 서비스(케이블, 영화관)보다 상대적으로 저렴한 가격에 이용할 수 있다는 장점이 있습니다. 무엇보다도 OTT 서비스의 가장 큰 장점은 이용자가 소비할 수 있는 콘텐츠의 선택의 폭이 넓다는 것입니다.

하지만 저희는 선택지가 많다는 장점이 오히려 이용자에게 불편을 초래하는 원인이 된다는 사실을 발견했습니다.
이러한 문제를 해결하기 위해 각 OTT 서비스에서는 자체적으로 추천 알고리즘을 활용하고 있습니다.
그런데도 많은 OTT 서비스의 이용자들은 여전히 서비스의 검색이나 추천 기능에 대해서 여러 가지 불편함을 느끼고 있습니다.
대표적인 예로, 넷플릭스에서든 자체 알고리즘과 장르 카테고라이징을 통해 이용자에게 다음에 볼 작품을 추천해주고 있으나, 많은 이용자는 넷플릭스에서 제공하는 분류 기준에 대해 불만을 느끼거나 실제로 이용자가 좋아할 만한 작품을 제대로 추천해주고 있지 않다는 생각을 하고 있습니다.

몇몇 이용자들은 이런 문제에 대한 대안으로 영화 리뷰 사이트를 통해 어떤 작품을 볼지 결정을 하기도 합니다.
하지만 이러한 방법에도 비슷한 문제점이 존재합니다.
바로 영화 리뷰 사이트 또한 여러 곳이 있다는 사실입니다.
쉽고 빠른 선택을 도와주는 서비스가 또 다른 선택을 하게 만드는 상황인 것입니다.
이용자가 많은 리뷰 사이트 중 한 곳을 선택한다고 해도 또 다른 문제가 생깁니다.
개별 사이트마다 존재할 수 있는 잠재적인 편향성 때문에 실제로 이용자의 취향에 맞는 영화를 찾지 못할 수도 있다는 것입니다.
그렇다고 여러 웹사이트에서 정보를 모두 찾아보는 것은 불편하고 시간이 너무 소모되는 방법입니다.

\#심심 해시는 이러한 문제 상황을 해결하고자 하는 럭키 세븐 팀의 의도에서 탄생한 서비스입니다. OTT 서비스를 사용하면서 어떤 작품을 볼지 선택하는 데 고민하는 이용자에게 도움을 줄 수 있습니다.

\#심심 해시는 여러 곳의 영화 리뷰 사이트에서 평점과 리뷰 데이터를 모아 분석을 진행하고 시각화하여 이용자에게 한눈에 비교 분석할 방법을 제공합니다.
첫째로, 저희 서비스는 여러 웹사이트에서 모은 데이터를 통합하여 분석하기 때문에 편향성을 줄일 수 있습니다.
둘째로, 하나의 영화에 대한 데이터를 분석한 결과를 한 페이지에서 핵심 키워드, 워드 클라우드, 도표 등으로 시각화하여 제공하기 때문에 이용자가 한눈에 비교할 수 있고 시간을 절약할 수 있습니다.
마지막으로 이미 어떤 영화에 대해 찾아볼지를 알고 있는 이용자가 아니더라도 핵심 키워드를 활용한 필터링 기능을 통해 이용자의 취향에 맞는 작품을 찾을 수 있습니다.

## 2. 프로젝트 목표
- OTT 서비스에서 제공하는 콘텐츠 분류 방법이나 검색 기능, 추천 알고리즘의 불편함을 해결합니다.
- OTT 서비스와 관련된 데이터를 바탕으로 이용자에게 특정 콘텐츠 관련 해시태그로 표현된 핵심 키워드 및 웹 사이트별 통합된 리뷰 정보를 제공한다면, 더욱 더 간편하고 개인화된 취향의 작품을 발견할 수 있고, 기존 문제점에 대한 해결책이 될 수 있습니다.
- 코로나 전후 상황을 비교했을 때 특정 콘텐츠에 대한 선호도나 이용자들의 평가와 반응에서 뚜렷한 차이를 발견한다면, 코로나 시대 유의미한 인사이트를 제공할 수 있을 것입니다.

## 3. 프로젝트 기능 설명

### 주요 기능 및 서브 기능
- 영화 사이트별 평점 데이터를 통합하여 통합 평점과 사이트별 평점을 시각화하여 한 페이지에서 제공하는 기능
    - 평점을 취합하여 보여줌으로써 잠재되어 있을지 모르는 편향성을 줄인 정보를 이용자에게 제공할 수 있습니다.
- 영화 사이트별 리뷰 데이터를 통합하여 추출된 키워드를 해시태그 형식으로 보여주는 기능
    - 이용자가 검색한 콘텐츠의 해시태그를 보고 해당 작품에 대한 일반적인 평가를 알고, 작품의 분위기와 장르를 파악할 수 있습니다.
- 코로나 전후 기준으로 분리하여 핵심 해시태그를 보여주는 기능
    - 코로나 전후로 해당 작품이 재평가되었는지, 그렇지 않은지 확인할 수 있습니다.
- 코로나 이후로 재평가된 작품을 추천해주는 기능
    - 이용자가 포스트 코로나 시대에 새로운 관점으로 감상할 수 있는 작품을 알 수 있습니다.
- 해시태그를 필터로 이용하여 비슷한 작품 검색하는 기능
    - 이용자의 원하는 키워드를 이용하여 취향에 알맞은 작품을 검색할 수 있습니다.
- 해시태그 가공 전 원본 상태의 리뷰를 보여주는 기능
    - 하나의 웹서비스에서 여러 영화 사이트에 업로드된 리뷰를 확인할 수 있습니다.

### 프로젝트만의 차별점, 기대 효과
기존에는 하나의 작품에 대한 평가를 편향됨 없이 알아보고 싶을 때, 여러 사이트를 각각 따로 방문해야 했습니다. 하지만 #심심해시 서비스를 이용하면 한 페이지 내에서 통합된 평가를 한 눈에 볼 수 있고, 해시태그나 차트 같은 분석 결과를 확인하여 한층 더 깊이 영화에 대한 정보를 알아볼 수 있습니다. 이에 더해 이용자가 원하는 키워드를 필터링하여 취향에 알맞은 작품을 검색하는 것 또한 다른 리뷰 사이트와 다른 점입니다. 마지막으로 코로나 전후로 같은 영화를 다르게 평가했는지도 알아볼 수 있게 됩니다.
이를 통해 이용자가 편향성을 줄인 정보를 이른 시간 안에 손쉽게 확인할 수 있을 것이라 기대됩니다.

## 4. 프로젝트 구성도
  - 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 박정윤 | 팀장/데이터 분석 |
| 사은수 | 프론트엔드 개발 |
| 송성곤 | 백엔드 개발/데이터 분석 |
| 박지호 | 프론트엔드 개발/데이터 분석 |
| 김수연 | 데이터 분석 |
| 김가원 | 백엔드 개발/데이터 분석 |

**멤버별 responsibility**

1. 팀장 

- 기획 단계: 자유로운 토론 분위기 조성, 팀원들의 의견 취합 및 최종기획안 도출, 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율, 데이터 분석, 파트별 개발 현황 파악
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 
- 기획 단계 : 와이어프레임 작성, 사용자 친화적인 UI/UX 디자인 설계, 컴포넌트 계층 구조 디자인
- 개발 단계 : 프론트엔드 기술 환경 구성 및 기능 구현, 와이어프레임과 UI/UX 기반으로 화면 구현, 데이터 시각화,  검색 결과 속도 및 페이지 렌더링 최적화, 시멘틱 마크업과 크로스브라우징 지원 작업
- 수정 단계: 피드백을 바탕으로 UI/UX 디자인 수정 및 반영, 테스팅 작업 진행

3. 백엔드 & 데이터 담당
- 기획 단계: 사용자와 프론트엔드 개발자에게 원하는 데이터를 넘겨줄 수 있는 API 구상, 스크래핑 등을 통해 수집한 데이터를 저장할 DB와 ERD 등을 설계
- 개발 단계: 사용자와 프론트엔드 개발자가 원하는 데이터를 보내줄 수 있는 API 개발, DB 구축, 통계적 분석, 감성분석, 시각화
- 수정 단계: 코치님 피드백 반영해서 로직/ 분석/ 시각화 방식 수정

## 6. 버전
  - 프로젝트의 버전 기입

## 7. FAQ
  - 자주 받는 질문 정리