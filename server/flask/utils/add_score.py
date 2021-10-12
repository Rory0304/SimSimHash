from re import M
import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pymongo import MongoClient
import pymysql
pymysql.install_as_MySQLdb()

from sqlalchemy import desc
from models.movie import Movie

from config import MONGO_URI
from config import SQLALCHEMY_DATABASE_URI

def score_cal(last_num):
    client = MongoClient(MONGO_URI)
    db = client.simsimhash
    col = db.review

    index = 0
    while index != last_num:
        cur = col.find({"movie_id": index})
        total = 0
        na, da, wa, ci = []

        for row in cur:
            if row['source_sit'] == 'naver':
                na.append(row['score'])
            if row['source_sit'] == 'daum':
                da.append(row['score'])
            if row['source_sit'] == 'watcha':
                wa.append(row['score'])
            if row['source_sit'] == 'cine21':
                ci.append(row['score'])
            







        index = index + 1

    client.close()
    return "ranking_list"

def score_input():
    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    Session = sessionmaker(bind=engine)
    session = Session()

    last_num = session.query(Movie).order_by(desc(Movie.id)).first().id
    score_cal(last_num)

    session.close()
    return "0"

score_input()