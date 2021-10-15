from flask import Blueprint, jsonify, request
from models.movie import Movie
from app import db, review_col, hashtag_col
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

@bp.route('/searchtag', methods=['POST'])
def search_tag():
    page = request.json.get('page')  # 몇번째 페이지(offset), 0부터 시작
    sort = request.json.get('sort') # 정렬기준
    N = request.json.get('N') # 한번에 보여줄 개수, 프론트엔드 개발할 때 편하도록
    input_tags = request.json.get('tags') # 입력 태그
    
    id_list = movie_id_return(input_tags)
    query_result = db.session.query(Movie).filter(Movie.id.in_(id_list))
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

def movie_id_return(tags):
    tags = tags.values()

    query = []
    for tag in tags:
        query.append({f'total.{tag}': {'$exists': 'true'}})

    #교집합 검색
    filterd_record = hashtag_col.find({"$and" : query})
    
    #리스트 생성
    index = 0
    search_list = []
    while index != filterd_record.count():
        try:
            search_list.append(filterd_record[index]['movie_id'])
        except:
            continue

        index = index + 1

    return search_list