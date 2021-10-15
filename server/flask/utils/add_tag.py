import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))
from app import review_col, hashtag_col
from config import SQLALCHEMY_DATABASE_URI
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.movie import Movie
from models.tag import Tag

from collections import defaultdict
import pandas as pd
import time 

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

'''
1. 딕셔너리들을 담는 리스트 insert_data
1. dataframe을 넣어준다 (title,noun,count)
2. add tag(df, source_site): return nothing
2. title로 Movie에 쿼리해서 id를 알아낸다. (아디 틀렸을 경우도 있어서 None이면 continue)
3. 

{
    movie_id: n,
    total: ,
    naver: ,
    daum: ,
    watcha: ,
    cine21: ,
}

movie_id는 1918까지 있음
'''
N = len(session.query(Movie).all())

insert_data_list = [{"movie_id": i+1, 
                     "total" : defaultdict(int), 
                     'naver':defaultdict(int),
                     'daum':defaultdict(int), 
                     'watcha':defaultdict(int), 
                     'cine21':defaultdict(int)} for i in range(N)]

def main(dataFrame, platform):
    '''
    최초 삽입용 코드
    '''
    print(f"{platform} 작업 시작")
    s = time.time()
    for title in dataFrame['title']:
        movie = session.query(Movie).filter(Movie.title==title).first()
        if movie == None:
            continue
        movie_id = movie.id
    
        nouns = dataFrame.loc[dataFrame['title']==title,'noun']
        counts = dataFrame.loc[dataFrame['title']==title,'count']
        print(movie_id, title)
        
        for word, freq in zip(nouns, counts):
            insert_data_list[movie_id-1][platform][word] = freq
            insert_data_list[movie_id-1]['total'][word] += freq
            
    print(f"{platform} 작업 완료")
    print("소요시간: ", s-time.time())
    


daum_csv = pd.read_csv('./data/review/Okt_keyword_50daum.csv')
naver_csv = pd.read_csv('./data/review/Okt_keyword50.csv')

main(daum_csv,'daum')
main(naver_csv, 'naver')
hashtag_col.insert_many(insert_data_list)



def update(dataFrame, platform):
    '''
    기존 값 삭제하지 않고 업데이트
    '''
    
    print(f"{platform} 작업 시작")
    s = time.time()
    
    for title in dataFrame['title']:
        ids = [] # 갱신할 id만 넣어두는 코드, 속도를 위해 필요
        movie = session.query(Movie).filter(Movie.title==title).first()
        if movie == None:
            continue
        movie_id = movie.id
        ids.append(movie_id)
        
        nouns = dataFrame.loc[dataFrame['title']==title,'noun']
        counts = dataFrame.loc[dataFrame['title']==title,'count']
        
        
        
        for word, freq in zip(nouns, counts):
            insert_data_list[movie_id][platform][word] = freq
            insert_data_list[movie_id]['total'][word] += freq
            
            
    for id in ids:
        update_data = insert_data_list[id]
        
        update_data
        hashtag_col.update({})
        
            
    print(f"{platform} 작업 완료")
    print("소요시간: ", s-time.time())




session.close()


# def main(dataFrame, platform):
#     print(f"{platform} 작업 시작")
#     s = time.time()
    
#     title = '모가디슈'
#     movie = session.query(Movie).filter(Movie.title==title).first()
#     if movie == None:
#         return
#     movie_id = movie.id
#     nouns = dataFrame.loc[dataFrame['title']==title,'noun']
#     counts = dataFrame.loc[dataFrame['title']==title,'count']
    
#     for word, freq in zip(nouns, counts):
#         insert_data_list[movie_id][platform][word] = freq
#         insert_data_list[movie_id]['total'][word] += freq
            
#     print(f"{platform} 작업 완료")
#     print("소요시간: ", s-time.time())