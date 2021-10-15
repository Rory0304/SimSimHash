from flask import Blueprint, jsonify, request
from models.movie import Movie
from app import db, review_col
from collections import defaultdict

bp = Blueprint('search', __name__)

@bp.route('/search', methods=['POST'])
def search_title():
    
    title = request.json.get('title') # 검색할 제목
    page = request.json.get('page')  # 몇번째 페이지(offset), 0부터 시작
    sort = request.json.get('sort') # 정렬기준
    N = request.json.get('N') # 한번에 보여줄 개수, 프론트엔드 개발할 때 편하도록
    
    # title의 키워드가 들어있는 영화를 모두 검색    
    query_result = db.session.query(Movie).filter(Movie.title.like(f"%{title}%"))
    query_length = len(query_result.all())
    if not query_result: # 검색결과가 없을 때
        return "no result!", 204
    
    # sort 최신순이 있는 경우, 개봉일을 기준으로 정렬
    if sort == "recent":
        query_result = query_result.order_by(Movie.release_date.desc())
        
    # page별로 N개씩 반환
    query_result = query_result.limit(N).offset(N*page)
    query_result = [i.to_dict() for i in query_result]

    result = {
        "length" : query_length,
        "content": query_result
    }
    
    return jsonify(result), 200

@bp.route('/search-tags')
def search_tag():
    query_tags = request.args.get('tags').split('-')
    
    ################
    # 합집합 
    # ids = []
    # for tag in query_tags:
    #     cursor = review_col.find({'content': {"$regex" : tag}})
    #     for cur in cursor:
    #         ids.append(cur['_id'])
    # ids = set(ids) # 중복 제거
    
    ##################
    
    ##################
    # 교집합
    
    id_dic = defaultdict(int)
    n = len(query_tags)
    for tag in query_tags:
        cursor = review_col.find({'full_tags': {"$regex" : tag}})
        for cur in cursor:
            id_dic[cur['movie_id']] += 1
    ids = [i for i in id_dic.keys() if id_dic[i]==n]  # 교집합 객체들의 object_id
    
    
    result = []
    for id in ids:
        result.append(Movie.query.filter(Movie.id == id).first().to_dict())
    
    return result
