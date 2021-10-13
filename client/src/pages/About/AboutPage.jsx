import { logo } from "../../assets/logo.png";

function AboutSimSimHash() {
    return (
        <section>
            <h2>#심심해시는 어떤 서비스인가요?</h2>
            <p></p>
        </section>
    );
}

function OTTwithCovid() {
    return (
        <section>
            <h2>OTT 서비스와 Covid-19</h2>
        </section>
    );
}

function TeamList() {
    return (
        <section>
            <h2>팀 Lucky Seven의 팀원을 소개합니다!</h2>
            <ul>
                <li>
                    <div>
                        <img alt="박정윤" />
                        <div>
                            <p>박정윤</p>
                            <p>#팀장 #데이터분석</p>
                        </div>
                    </div>
                    <div>
                        <img alt="김가원" />
                        <div>
                            <p>김가원</p>
                            <p>#백엔드 개발 #데이터 분석</p>
                        </div>
                    </div>
                    <div>
                        <img alt="김수연" />
                        <div>
                            <p>김수연</p>
                            <p>#데이터분석</p>
                        </div>
                    </div>
                    <div>
                        <img alt="박지호" />
                        <div>
                            <p>박지호</p>
                            <p>#프론트엔드 개발 #데이터 분석</p>
                        </div>
                    </div>
                    <div>
                        <img alt="사은수" />
                        <div>
                            <p>사은수</p>
                            <p>#프론트엔드 개발</p>
                        </div>
                    </div>
                    <div>
                        <img alt="박정윤" />
                        <div>
                            <p>박정윤</p>
                            <p>#팀장 #데이터분석</p>
                        </div>
                    </div>
                    <div>
                        <img alt="송성곤" />
                        <div>
                            <p>송성곤</p>
                            <p>#백엔드 개발 #데이터 분석</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    );
}

function AboutPage() {
    return (
        <div>
            <div>
                <img src={logo} alt="심심해시 메인 배너 이미지" />
            </div>
            <article>
                <AboutSimSimHash />
                <OTTwithCovid />
                <TeamList />
            </article>
        </div>
    );
}

export default AboutPage;
