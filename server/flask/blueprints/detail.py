from re import search
from flask import Blueprint, jsonify, request
from models.movie import Movie
from app import hashtag_col, review_col

bp = Blueprint('detail',__name__)

@bp.route("/detail/get_detail", methods=['GET'])
def get_detail():
    movie_id = request.args.get('movie_id')
    
    movie_detail = get_movie_detail(movie_id)
    total_detail = get_total_detail(movie_id)
    platform_summary = get_platform_summary(movie_id)

    return jsonify({"detail": movie_detail, "total": total_detail, "platform_summary": platform_summary})

@bp.route("/detail/get_platform", methods=['POST'])
def get_platform():
    movie_id = request.json['movie_id']
    platform = request.json['platform']

    get_platform_tag(movie_id, platform)
    
    return jsonify()


def get_movie_detail(movie_id):
    filtered_movie = Movie.query.filter(Movie.id == movie_id).first()

    searched_movie = {
        "title": filtered_movie.title,
        "release_date": filtered_movie.release_date,
        "actor": filtered_movie.actor,
        "director": filtered_movie.director,
        "summary": filtered_movie.summary,
        "running_time": filtered_movie.running_time,
        "poster": filtered_movie.poster,
        "genre": filtered_movie.genre,
        "rating": filtered_movie.rating
    }

    return searched_movie

def get_total_detail(movie_id):
    filtered_movie = Movie.query.filter(Movie.id == movie_id).first()

    searched_movie = {
        "score": filtered_movie.score,
        "tags": list(get_platform_tag(movie_id, "total"))
    }

    return searched_movie

def get_platform_summary(movie_id):
    filtered_movie = Movie.query.filter(Movie.id == movie_id).first()

    searched_movie = {
        "naver": filtered_movie.naver,
        "daum": filtered_movie.daum,
        "watcha": filtered_movie.watcha,
        "cine21": filtered_movie.cine21,
        "naver_count": get_review_num(movie_id, "naver"),
        "daum_count":get_review_num(movie_id, "daum"),
        "watcha_count":get_review_num(movie_id, "watchapedia"),
        "cine21_count":get_review_num(movie_id, "cine21"),
        "naver_tag": list(get_platform_tag(movie_id, "naver"))[0: 6],
        "daum_tag": list(get_platform_tag(movie_id, "daum"))[0: 6],
        "watcha_tag": list(get_platform_tag(movie_id, "watcha"))[0: 6],
        "cine21_tag": list(get_platform_tag(movie_id, "cine21"))[0: 6]
    }

    return searched_movie

def get_platform_tag(movie_id, platform):
    #movie_id int처리
    tags = hashtag_col.find_one({"movie_id": int(movie_id)})
    platform_tags = tags[platform]

    return platform_tags
    
def get_review_num(movie_id, platform):
    #movie_id int처리
    reviews = review_col.find({"movie_id": int(movie_id), "source_site": platform})

    return reviews.count()