import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException

# m_data_수정 전

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 샹치 페이지 접속
driver.get("https://movie.daum.net/moviedb/main?movieId=129706")

time.sleep(2)

title = []
release = []
genre = []
running = []
nation = []
grade = []
cast = []
story = []     
    
# 시간 지연 
time.sleep(1)
        
# 제목
title.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_tit > h3 > span.txt_tit").text)

# 개봉일
release.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_cont > div:nth-child(1) > dl:nth-child(1) > dd").text)

# 장르
genre.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_cont > div:nth-child(1) > dl:nth-child(2) > dd").text)

# 국가
nation.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_cont > div:nth-child(1) > dl:nth-child(3) > dd").text)

# 등급
grade.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_cont > div:nth-child(1) > dl:nth-child(4) > dd").text)

# 러닝타임
running.append(driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_cont > div:nth-child(1) > dl:nth-child(5) > dd").text)


# 출연
castboxes = driver.find_elements_by_css_selector("#mainContent > div > div.box_detailinfo > div.contents > div.detail_crewinfo > ul > li")
# 리스트 컴프리헨션으로 [i.text.split('\n')[0] for i in castboxes] 배우들이 들어있는 리스트를 만든다
# 여러 명의 배우들이 들어있는 리스트를 ,로 구분하는 문자열로 합쳐준다. 
cast.append(','.join([i.text.split('\n')[0] for i in castboxes]))

# 줄거리
driver.find_element_by_xpath('//*[@id="mainContent"]/div/div[2]/div[2]/div[1]/div/div/a').click()


storypre = driver.find_element_by_css_selector("#mainContent > div > div.box_detailinfo > div.contents > div.detail_basicinfo > div > div > div").text
# replace는 하나만 하셔도 될것같습니다! 다만 replace를 한 뒤에 변수에 다시 할당해주어야 그 변수를 다음에 사용할 수 있습니다 :) 
storypre = storypre.replace('\n','')

story.append(storypre)
        
df = pd.DataFrame({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release,'cast':cast, 'grade':grade, 'story':story})
#df = pd.DataFrame({'title':title,'genre':genre,'nation':nation,'running':running, 'release':release,'cast':str(cast), 'grade':grade, 'story':story})