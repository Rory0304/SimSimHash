import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException

# 다음 영화 연간 박스오피스 순위
import pandas as pd

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome('C:/Users/sooyeon/Downloads/chromedriver.exe')

# 2019 페이지 접속
driver.get("https://movie.daum.net/ranking/boxoffice/yearly?date=2019")

time.sleep(2)

# 영화 리스트 불러오기
boxes = driver.find_elements_by_css_selector('#mainContent > div > div.box_boxoffice > ol > li')
for box in boxes:
    print(box.text)
