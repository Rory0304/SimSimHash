import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

import pandas as pd
from app import hashtag_col

naver = pd.read_csv("./data/review/Okt_keyword50.csv")
daum = pd.read_csv("./data/review/Okt_keyword_50daum.csv")
watcha = pd.read_csv("./data/review/Okt_Wa_keyword_last.csv")
cine = pd.read_csv("./data/review/Okt_cine_keyword.csv")

#중복처리
naver = list(naver['noun'])
naver = list(dict.fromkeys(naver))
daum = list(daum['noun'])
daum = list(dict.fromkeys(daum))
watcha = list(watcha['noun'])
watcha = list(dict.fromkeys(watcha))
cine = list(cine['noun'])
cine = list(dict.fromkeys(cine))
insert_data = naver + daum + watcha + cine
insert_data = list(dict.fromkeys(insert_data))

index = 0
daum_index = 0
hashtag_col.delete_one({"total_tag": "true"})
hashtag_col.insert_one({"total_tag": "true"})

def insert_fun(index, noun):
    hashtag_col.update_one({"total_tag": "true"}, {"$push": { "content": {"index": str(index), "tag": noun}}})

while index != len(insert_data):
    try:
        insert_fun(index, insert_data[index])

    except:
        continue

    print(index, len(insert_data))
    index = index + 1



