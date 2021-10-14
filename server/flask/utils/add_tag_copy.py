import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))
from app import review_col, hashtag_col
from config import SQLALCHEMY_DATABASE_URI
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.movie import Movie
from models.tag import Tag

from collections import Counter, defaultdict

from konlpy.tag import Mecab
mecab = Mecab()

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

cur = hashtag_col.find({})
total_tag = []
for i,j in enumerate(cur):
    try:
        total_tag += list(j['total'].keys())
    except:
        pass
    
hashtag_col.insert_one({'movie_id':0, "content": ",".join(total_tag)})
    
# 전체 삭제
# d = hashtag_col.delete_many({})
# print(d.deleted_count)
# 

# hashtag_col.insert_many([i.to_json() for i in insert_data_list])
session.close()