from flask import Blueprint, jsonify
from random import sample
from app import hashtag_col

bp = Blueprint('tag',__name__)

@bp.route('/tag', methods=['GET'])
def get_tags():
    QUERY = 24 # 넘겨줘야 할 태그 수
    
    # 전체 태그 수
    last_num = hashtag_col.find_one({}, {"content": {"$slice": -1}})['content'][0]['index']

    #넘겨줄 태그 수 만큼 전체 태그 수에서 번호 랜덤 추출
    random_num = sample(range(0, int(last_num)), QUERY)
    
    #랜덤 번호로 태그 검색
    random_tag = []
    for rnum in random_num:
        tag = hashtag_col.find_one({"content": {"$elemMatch": {"index": str(rnum)}}},
                                    {"content": {"$elemMatch": {"index": str(rnum)}}})['content'][0]['tag']

        random_tag.append(tag)
        
    return jsonify(random_tag)
