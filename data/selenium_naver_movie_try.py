import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
url = "https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019&page=2"
driver.get(url)

# 시간 지연
time.sleep(2)

# 리스트 정의
result = []

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
link = []
for box in boxes:
    link.append(box.find_element_by_css_selector('a').get_attribute('href'))
    
# 링크 한줄 씩 반복문
# 한 페이지당 해당하는 영화는 20개


title = []
genre = []
nation = []
running = []
release = []
director = []
actor = []
grade = []
story = []  

 

for i in range(0,20):
    # i번째 링크 접속하기
    driver.get(link[i])

    # 시간 지연 
    time.sleep(1)
    
    try:
        # 제목
        title.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > h3 > a").text)

        # 장르
        genre.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1)").text)

        # 국가
        nation.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(2) > a").text)

        # 러닝타임
        running.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(3)").text)

        # 개봉일
        release.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(4)").text)

        # 감독
        director.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4)").text)

        # 출연
        actor.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p").text)
        
        # 등급
        grade.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a").text)

        # 줄거리
        storypre = driver.find_element_by_css_selector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p").text
        storypre.replace("\n","")
        story.append(storypre)



        
    except NoSuchElementException:
        continue
        

# 데이터 프레임 생성
dfdf = pd.DataFrame.from_dict({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release, 'director':director, 'actor':actor, 'grade':grade, 'story':story},orient='index').transpose()
# 결과 값에 추가
#result.append(df43)
    
    
#except Exception as error:
#    actor.append("null")
#    continue
    
    
# df.to_csv("tmp_.csv",sep = '|',index = None)