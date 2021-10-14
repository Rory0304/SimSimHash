import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

import pandas as pd
from app import hashtag_col

naver = pd.read_csv("./data/review/Okt_keyword50.csv")
daum = pd.read_csv("./data/review/Okt_keyword_50daum.csv")

naver = naver['noun']
daum = daum['noun']

index = 0
daum_index = 0
hashtag_col.insert_one({"total_tag": "true"})

def insert_fun(index, noun):
    hashtag_col.update({"total_tag": "true"}, {"$push": { "content": {"index": str(index), "tag": noun}}})

while index != len(naver)+len(daum):
    try:
        if index >= len(naver):
            insert_fun(index, daum[daum_index])
            daum_index = daum_index + 1
        else:
            insert_fun(index, naver[index])

    except:
        continue

    print(index)
    index = index + 1



