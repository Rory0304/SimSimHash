import pandas as pd
from pymongo import MongoClient
from models.review import Review

FILE_PATH = "./review_sample.csv"
MONGO_URI = 'mongodb://172.30.1.35:27017/'

def get_movie_id(title, write_date):
    
    movie_id = 1

    return movie_id

#########테이블, 데이터 컬럼명 통일
#########collection명 수정
############data에 site 컬럼 추가 필요
def mongo_insert(data):

    client = MongoClient(MONGO_URI)
    db = client.simsimhash
    col = db.test
    
    # fordata = zip(data['title'], data['score'], data['write_date'], data['content'], data['source_site'])
    fordata = zip(data['title'], data['score'], data['date'], data['review'])

    now_title, now_date, movie_id = "", "", ""
    for (title, score, write_date, content) in fordata:
        #현재 row와 이전 row가 같은 작품의 리뷰인지 확인
        if now_title != title or now_date != write_date:
            now_title = title
            now_date = write_date

            movie_id = get_movie_id(title, write_date)

        insert_data = Review(movie_id= movie_id, score= score, content= content, write_date= write_date, source_site= "naver")
        col.insert_one(insert_data.to_json())

    client.close()
    return "0"

sample_data = pd.read_csv(FILE_PATH) 
mongo_insert(sample_data)