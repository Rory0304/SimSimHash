import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

import pandas as pd
from app import review_col, hashtag_col, client
import time

naver = pd.read_csv("./data/review/Okt_keyword50.csv")
daum = pd.read_csv("./data/review/Okt_keyword_50daum.csv")

naver = naver['noun']
daum = daum['noun']


hashtag_col.insert_one({"total_tag": "true"})

sleep_time = 0
index = 0
for noun in naver:
    hashtag_col.update({"total_tag": "true"}, {"$push": { "content": {"index": str(index), "tag": noun}}})
    index = index + 1
    print(sleep_time)

    sleep_time =sleep_time + 1
    if sleep_time == 200:
        time.sleep(5)
        sleep_time = 0


for noun in daum:
    hashtag_col.update({"total_tag": "true"}, {"$push": { "content": {"index": str(index), "tag": noun}}})
    # time.sleep(0.9)
    index = index + 1

    sleep_time =sleep_time + 1
    if sleep_time == 30:
        time.sleep(5)
        sleep_time = 0


