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
import pandas as pd

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

id는 1918까지
'''
N = len(session.query(Movie).all())

insert_data_list = [{"movie_id": i, 
                     "total" : defaultdict(int), 
                     'naver':defaultdict(int),
                     'daum':defaultdict(int), 
                     'watcha':defaultdict(int), 
                     'cine21':defaultdict(int)} for i in range(N)]


daum_csv = pd.read_csv('./data/review/Okt_keyword_50daum.csv')
naver_csv = pd.read_csv('./data/review/Okt_keyword50.csv')

# def main(dataFrame, platform):
    
#     for title in dataFrame['title']:
#         movie = session.query(Movie).filter(Movie.title==title).first()
#         if movie == None:
#             continue
#         movie_id = movie.id
        
#         nouns = dataFrame.loc[dataFrame['title']==title,'noun']
#         counts = dataFrame.loc[dataFrame['title']==title,'count']
        
#         word_freq_pairs = [(word+'.'+str(freq)) for word, freq in zip(nouns, counts)]
#         insert_data_list[movie_id][platform] += str(word_freq_pairs)

def main(dataFrame, platform):
    
    title = '모가디슈'
    movie = session.query(Movie).filter(Movie.title==title).first()
    if movie == None:
        return
    
    
    movie_id = movie.id
    
    nouns = dataFrame.loc[dataFrame['title']==title,'noun']
    counts = dataFrame.loc[dataFrame['title']==title,'count']
    
    
    for word, freq in zip(nouns, counts):
        insert_data_list[movie_id][platform][word] = freq
        insert_data_list[movie_id]['total'][word] += freq
        

main(daum_csv,'daum')
main(naver_csv, 'naver')



        



# N = len(session.query(Movie).all())
# target_tags = ['NNG', 'NNP','NR', 'NNB']
# projection = {"_id": False}

# insert_data_list = []
# for i in range(1, N+1):
    
#     cur = review_col.find({'movie_id': i}, projection)
    
#     text_dict = {
#         'total' : "",
#         'naver' : "",
#         'daum' : "",
#         'watchapedia' : "",
#         'cine21' : "",
#     }
    
#     for review in cur:
    
#         text = review["content"]
#         source_site = review["source_site"]
        
#         text_dict['total'] += text
#         text_dict[source_site] += text
        
    
#     tag_dict=defaultdict(dict)
    
#     tag_dict['total'] = counter_to_dict(Counter(get_tags(text_dict['total'])).most_common(25))
#     tag_dict['naver'] = counter_to_dict(Counter(get_tags(text_dict['naver'])).most_common(25))
#     tag_dict['daum'] = counter_to_dict(Counter(get_tags(text_dict['daum'])).most_common(25))
#     tag_dict['watchapedia'] = counter_to_dict(Counter(get_tags(text_dict['watchapedia'])).most_common(25))
#     tag_dict['cine21'] = counter_to_dict(Counter(get_tags(text_dict['cine21'])).most_common(25))
            
#     insert_data = Tag(movie_id= i, 
#                          total=tag_dict['total'], 
#                          naver=tag_dict['naver'], 
#                          daum=tag_dict['daum'], 
#                          watcha=tag_dict['watchapedia'],
#                          cine21=tag_dict['cine21'])
    
#     insert_data_list.append(insert_data)
    
# # 전체 삭제
# # d = hashtag_col.delete_many({})
# # print(d.deleted_count)
# # 

# hashtag_col.insert_many([i.to_json() for i in insert_data_list])
session.close()