import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException

import pandas as pd

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')
driver.get("https://movie.daum.net/moviedb/grade?movieId=79772") 

time.sleep(2)

result = [] # 
score = [] # 평점
review = [] # 리뷰 
date = [] # 작성일 

# 영화 제목 (수집할 데이터는 get에서 받은 영화제목 단 하나이기때문에 굳이 리스트로 받을 필요가 없이 문자열로 받으셔도 충분합니다. )
title = driver.find_element_by_css_selector("#mainContent > div > div.box_basic > div.info_detail > div.detail_tit > h3 > span.txt_tit").text


# 리뷰 클릭 
driver.find_element_by_xpath('//*[@id="mainContent"]/div/div[2]/div[1]/ul/li[4]/a/span').click()


# 반복문을 통해 리뷰 더보기 클릭 
# 무한루프를 돌다가 더보기를 클릭할 수 없을때 멈추게 되어있습니다. 너무 많은 리뷰가 필요한게 아니라면 for문으로 수정해서 적당히 수집하셔도 좋습니다 :)
while True : 
    try:
        driver.find_element_by_xpath('''//*[@id="alex-area"]/div/div/div/div[3]/div[1]/button''').click()
        time.sleep(1.5) # 잠자는 시간은 요령껏 주시면 됩니다. 너무 짧으면 딜레이가 생겨 일찍 종료하게 되고 너무 길면 실행시간이 오래걸립니다. 
    except:
        break
        #continue

boxes = driver.find_elements_by_css_selector("#alex-area > div > div > div > div.cmt_box > ul.list_comment > li") # 리뷰 더보기가 끝났다면 box들을 수집해봅시다. 


len(boxes) 

# 박스를 돌면서 평점, 리뷰, 작성일을 수집합니다. 
for box in boxes:
    score.append(box.find_element_by_css_selector("li > div > div.ratings").text)
    date.append(box.find_element_by_css_selector("li > div > strong > span > span.txt_date").text)
    review.append(box.find_element_by_css_selector("li > div > p").text)


# 여기에 직접 title을 입력하지 않는 이유는 title은 오직 한 개이며, 평점과 일자 리뷰는 box의 개수만큼 생기기때문에 길이가 맞지않습니다. 
df = pd.DataFrame({'score': score, 'date':date,'review':review}) # 반복문을 통해 리뷰의 개수만큼 row수가 생겨납니다. 

df['title'] = title # 그러므로 타이틀은 다음과같은 방법으로 입력해주시면 됩니다. 
df.head()