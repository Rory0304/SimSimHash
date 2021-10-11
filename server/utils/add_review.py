import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pymongo import MongoClient
import pandas as pd

from models.review import Review
from models.movie import Movie

FILE_PATH = "./review_sample.csv"
from config import MONGO_URI
from config import SQLALCHEMY_DATABASE_URI

def convert_datetime(dt):
    from datetime import datetime
    date, time = dt.split()
    year, month, day = map(int,date.split('.'))
    hour, minute = map(int, time.split(':'))

    return datetime(year=year, month=month, day=day, hour=hour, minute=minute).isoformat()

def get_movie_id(title, date):
    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    Session = sessionmaker(bind=engine)
    session = Session()

    movie_id = session.query(Movie).filter(Movie.title == title and Movie.release_date == date).first()
    #검색 결과 없는 영화 id -1로 처리, 데이터 완성되면 삭제
    if movie_id == None:
        movie_id = -1
    else:
        movie_id = movie_id.id

    session.close()
    return movie_id

def mongo_insert(data):
    client = MongoClient(MONGO_URI)
    db = client.simsimhash
    col = db.review
    
    data['write_date'] = data['write_date'].apply(convert_datetime)
    fordata = zip(data['title'], data['release_date'] ,data['score'], data['write_date'], data['content'], data['source_site'])

    now_title, now_date, movie_id = "", "", ""
    for (title, release_date, score, write_date, content, source_site) in fordata:
        #현재 row와 이전 row가 같은 작품의 리뷰인지 확인
        if now_title != title or now_date != release_date:
            now_title = title
            now_date = release_date
            
            movie_id = get_movie_id(title, release_date)

        insert_data = Review(movie_id= movie_id, score= score, content= content, write_date= write_date, source_site= source_site)
        col.insert_one(insert_data.to_json())
        
    client.close()
    return "0"

sample_data = pd.read_csv(FILE_PATH) 
mongo_insert(sample_data)