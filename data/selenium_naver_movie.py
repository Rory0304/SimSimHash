#!/usr/bin/env python
# coding: utf-8

# > * 네이버 영화 디렉토리 : https://movie.naver.com/movie/sdb/browsing/bmovie.naver
# > * 개봉년도 (2019) : https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019
# > * 개봉년도 (2019) & 1페이지 : https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019&page=1


import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException


# ## 2019년 1페이지 영화 리스트
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
for box in boxes:
    title = box.find_element_by_css_selector('a').text
    print(title)


# ### 리스트 담기


## 1페이지만
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)

title = []
# 영화 리스트 불러오기

boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
for box in boxes:
    title.append(box.find_element_by_css_selector('a').text)


title


# ## 영화별 주소 불러오기
import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
url = "https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019"
driver.get(url)

time.sleep(2)

result = []

    
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
for box in boxes:    
    link = box.find_element_by_css_selector('a').get_attribute('href')
    print(link)


# ### 리스트에 저장


# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
link = []
for box in boxes:
    link.append(box.find_element_by_css_selector('a').get_attribute('href'))


print(link)


# ### 링크 데이터 확인
type(link)
len(link)
link[0]
link[19]


# ## 페이지별 영화 목록 가져오기 (1 ~ 9 page)


# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)

title = []
# 영화 리스트 불러오기
for i in range(0,9):
    boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
    for box in boxes:
        title.append(box.find_element_by_css_selector('a').text)
        
    
    # pagebar : 각각 불러올 페이지 #old_content > div.pagenavigation > table > tbody > tr > td:nth-child(1) > a
    page_bar = driver.find_elements_by_css_selector("div.pagenavigation > table > tbody > tr > td > *")
    page_bar[i+1].click()

title


# ## 2019년 개봉영화에 해당하는 모든 페이지의 영화 정보를 가져오는 코드 (1 ~ 43페이지)

# ## error : 1페이지부터 43페이지까지 출력하는 for문에서 항상 17페이지까지만 데이터가 수집되고 18페이지부터 에러가 발생합니다.
# > NoSuchElementException: Message: no such element: Unable to locate element: {"method":"xpath","selector":"//*[@id="old_content"]/div[3]/table/tbody/tr/td[13]"}
#   (Session info: chrome=94.0.4606.61)

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)

title = []

# 영화 리스트 불러오기
for i in range(1,43):
    boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
    for box in boxes:
        title.append(box.find_element_by_css_selector('a').text)

    driver.find_element_by_xpath('''//*[@id="old_content"]/div[3]/table/tbody/tr/td[{}]'''.format(str(i))).click()
    time.sleep(2)


# ### xpath가 아닌 다른 방법을 적용해도 같은 오류

'''
    # pagebar : 각각 불러올 페이지 #old_content > div.pagenavigation > table > tbody > tr > td:nth-child(1) > a
    page_bar = driver.find_elements_by_css_selector("div.pagenavigation > table > tbody > tr > td > *")
    page_bar[i+1].click()
'''  


# ### 에러발생하기 직전까지 수집된 영화 리스트 

title


# ----------------------------

# ## 한 영화의 정보만 가져오기 

# ### 데이터 구성
# - 개요
# - 감독
# - 출연
# - 등급(관람가)

# 개요 구성
# - 장르
# - 국적
# - 러닝타임
# - 개봉일 

# 한 페이지당 영화 목록 : `20개`

# ### 하나의 영화 정보만을 가져오는 코드 작성

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 겨울왕국2 페이지 접속
driver.get("https://movie.naver.com/movie/bi/mi/basic.naver?code=136873")

time.sleep(2)

title = []
genre = []
nation = []
running = []
release = []
director = []
actor = []
grade = []
story = []    
    
    
# 시간 지연 
time.sleep(1)
        
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
        
df = pd.DataFrame({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release, 'director':director, 'actor':actor, 'grade':grade, 'story':story})
        

df


# ## 한 페이지에 속한 영화 리스트의 링크를 타고 총 20개의 영화정보를 가져오는 코드 작성

# ## error 2
# ### 문제점 : 출연 데이터가 존재하지 않으면 데이터 수집 X 

import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
url = "https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019"
driver.get(url)

# 시간 지연
time.sleep(2)

# 리스트 정의
result = []

title = []
genre = []
nation = []
running = []
release = []
director = []
actor = []
grade = []
story = []    

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
link = []
for box in boxes:
    link.append(box.find_element_by_css_selector('a').get_attribute('href'))
    
# 링크 한줄 씩 반복문
# 한 페이지당 해당하는 영화는 20개
try:
    for i in range(0,20):

        # i번째 링크 접속하기
        driver.get(link[i])

        # 시간 지연 
        time.sleep(1)

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


        # 데이터 프레임 생성
        df = pd.DataFrame({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release, 'director':director, 'actor':actor, 'grade':grade, 'story':story})
        # 결과 값에 추가
        result.append(df)

        # 뒤로가기
        driver.back()

        
except NoSuchElementException:
    actor.append("null")
    
#except Exception as error:
#    actor.append("null")
#    continue
    
    
# df.to_csv("tmp_.csv",sep = '|',index = None)


# ## 중간에 에러가 발생하면 수집을 멈추게됨
# ## 저장된 영화정보를 살펴보면 16번째 데이터까지 저장되어있음
# ## ---->  17번째 영화를 확인해보니 출연 정보가 없었음 


df


# ## 코드수정 --> 출연 데이터만 제외하고 수집
# ### 데이터 구성: 
# * 제목
# * 개요
# * 감독
# * 등급
# * 줄거리


import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2018 페이지 접속
url = "https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2018"
driver.get(url)

# 시간 지연
time.sleep(2)

# 리스트 정의
result = []

title = []
about = []
director = []
grade = []
story = []    

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
link = []
for box in boxes:
    link.append(box.find_element_by_css_selector('a').get_attribute('href'))
    
# 링크 한줄 씩 반복문
try:
    for i in range(0,20):

        # i번째 링크 접속하기
        driver.get(link[i])

        # 시간 지연 
        time.sleep(1)

        # 제목
        title.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > h3 > a").text)
        
        # 개요
        about.append(driver.find_element_by_css_selector('#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2)').text)

        # 감독
        director.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4)").text)

        # 등급
        grade.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a").text)

        # 줄거리
        storypre = driver.find_element_by_css_selector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p").text
        storypre.replace("\n","")
        story.append(storypre)


        # 데이터 프레임 생성
        df = pd.DataFrame({'title':title,'about':about, 'director':director, 'grade':grade, 'story':story})
        # 결과 값에 추가
        result.append(df)

        # 뒤로가기
        driver.back()

        
except NoSuchElementException:
    pass


# ###  수정전과 마찬가지로 출연정보가 없는 데이터를 기준으로 수집을 멈춥니다

df 


# 개요부분


import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2018 페이지 접속
url = "https://movie.naver.com/movie/bi/mi/basic.naver?code=166416"
driver.get(url)

driver.find_element_by_css_selector('#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2)').text


# ## 오류 (try except 문 적용 전)
# NoSuchElementException: Message: no such element: Unable to locate element: {"method":"css selector","selector":"#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a"}
#   (Session info: chrome=94.0.4606.61)
# 

import pandas as pd
# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
url = "https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019"
driver.get(url)

# 시간 지연
time.sleep(2)

# 리스트 정의
result = []

title = []
genre = []
nation = []
running = []
release = []
director = []
actor = []
grade = []
story = []    

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector("#old_content > ul > li")
link = []
for box in boxes:
    link.append(box.find_element_by_css_selector('a').get_attribute('href'))
    
# 링크 한줄 씩 반복문

for i in range(0,20):
    # i번째 링크 접속하기
    driver.get(link[i])
    # 시간 지연 
    time.sleep(1)
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
    when = driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p")
    
    if when is None:
        actor.append("Null")       
    else:
        actor.append(when.text)

    
    
    # 등급
    grade.append(driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a").text)
    # 줄거리
    storypre = driver.find_element_by_css_selector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p").text
    storypre.replace("\n","")
    story.append(storypre)
    # 데이터 프레임 생성
    df = pd.DataFrame({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release, 'director':director, 'actor':actor, 'grade':grade, 'story':story})
    # 결과 값에 추가
    result.append(df)
    # 뒤로가기
    driver.back()


# -------------------------------------------

# ### 영화 정보 수집 사용하는 코드 (한줄씩)

# ## 영화 정보 수집하기


#content > div.article > div.mv_info_area > div.mv_info



# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open=2019")

time.sleep(2)


# ## 영화 리뷰 수집하기



import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time


import requests
from bs4 import BeautifulSoup


# ### 페이지 접속

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 겨울왕국2 페이지 접속
driver.get("https://movie.naver.com/movie/bi/mi/basic.naver?code=136873")

time.sleep(2)


# ## 영화정보

# ### 제목 
# * #content > div.article > div.mv_info_area > div.mv_info > h3 > a


driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > h3 > a").text


# ### 장르



driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1)").text


# ### 국가


driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(2) > a").text


# ### 러닝타임


driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(3)").text


# ### 개봉일


driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(4)").text


# ### 감독


driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4)").text


# ### 출연진 

driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p").text


# ### 등급

driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a").text


# ### 줄거리



story = driver.find_element_by_css_selector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p").text



story.replace("\n","")


# ## 전체 코드



# 제목
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > h3 > a").text

# 장르
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1)").text

# 국가
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(2) > a").text

# 러닝타임
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(3)").text

# 개봉일
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(4)").text

# 감독
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4)").text

# 출연
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p").text

# 등급
driver.find_element_by_css_selector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a").text

# 줄거리
story = driver.find_element_by_css_selector("#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > p").text
story.replace("\n","")

