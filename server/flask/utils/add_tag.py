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

daum_csv = pd.read_csv('./data/review/Okt_keyword_50daum.csv')
naver_csv = pd.read_csv('./data/review/Okt_keyword50.csv')
watcha_csv = pd.read_csv('./data/review/Okt_Wa_keyword_last.csv')
cine21_csv = pd.read_csv('./data/review/Okt_cine_keyword.csv')
# 영화 전체 개수
N = len(session.query(Movie).all())

### 삽입용 코드
insert_data_list = [{"movie_id": i+1, 
                     "total" : defaultdict(int), 
                     'naver':defaultdict(int),
                     'daum':defaultdict(int), 
                     'watcha':defaultdict(int), 
                     'cine21':defaultdict(int)} for i in range(N)]

# def main(dataFrame, platform):
#     '''
#     최초 삽입용 코드
#     '''
#     print(f"{platform} 작업 시작")
#     s = time.time()
#     for title in dataFrame['title']:
#         movie = session.query(Movie).filter(Movie.title==title).first()
#         if movie == None:
#             continue
#         movie_id = movie.id
    
#         nouns = dataFrame.loc[dataFrame['title']==title,'noun']
#         counts = dataFrame.loc[dataFrame['title']==title,'count']
        
#         for word, freq in zip(nouns, counts):
#             insert_data_list[movie_id-1][platform][word] = freq
#             insert_data_list[movie_id-1]['total'][word] += freq
            
#     print(f"{platform} 작업 완료")
#     print("소요시간: ", time.time()-s)
    




# main(daum_csv,'daum')
# main(naver_csv, 'naver')
# print("데이터 처리 완료")
# hashtag_col.insert_many(insert_data_list)
# print("삽입 완료")



### update용 코드

update_data_list = [{"movie_id": i+1, 
                     "total" : defaultdict(int), 
                     'naver':defaultdict(int),
                     'daum':defaultdict(int), 
                     'watcha':defaultdict(int), 
                     'cine21':defaultdict(int)} for i in range(N)]
update_ids = [] # 갱신할 id만 넣어두는 코드, 속도를 위해 필요
def update(dataFrame, platform):
    '''
    기존 값 삭제하지 않고 업데이트
    '''
    
    print(f"{platform} 작업 시작")
    s = time.time()
    
    for title in dataFrame['title']:

        movie = session.query(Movie).filter(Movie.title==title).first()
        if movie == None:
            continue
        movie_id = movie.id
        update_ids.append(movie_id)
        
        nouns = dataFrame.loc[dataFrame['title']==title,'noun']
        counts = dataFrame.loc[dataFrame['title']==title,'count']
        
        for noun, count in zip(nouns, counts):
            update_data_list[movie_id-1][platform][noun] = count
            update_data_list[movie_id-1]['total'][noun] += int(count/len(nouns))
            
    print(f"{platform} 작업 완료")
    print("소요시간: ", time.time() - s)
    return
    
update(daum_csv,'daum')
update(naver_csv, 'naver')
update(watcha_csv, 'watcha')
update(cine21_csv, 'cine21')
print("데이터 처리 완료")

for id in update_ids:
    # movie_id는 인덱싱의 id보다 1 크다. -> update_data_list를 인덱싱 할 때는 -1을 하여 인덱싱해야 된다.
        
    query = {"movie_id":id}
    update_data = {"$set": update_data_list[id-1]}
    
    hashtag_col.update_one(query, update_data)
    print(f"{id}\t업데이트 완료")

session.close()