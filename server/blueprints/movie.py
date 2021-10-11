from flask import Blueprint, jsonify, request
from flask_pymongo import MongoClient
from app import db
from config import MONGO_URI
from models.movie import Movie
from utils.tag_search import tag_search

bp = Blueprint('movie',__name__)

@bp.route("/movie", methods=['GET', 'POST'])
def get_movies():
    client = MongoClient(MONGO_URI)
    mongodb = client.simsimhash
    col = mongodb.ranking
    hashcol = mongodb.tags
    
    if request.method == 'GET':
        search_list = list(col.find_one({"collection": "ranking"}).values())[2:]

    if request.method == 'POST':
        selected_tags = request.json['selectedTags']
        search_option = request.json['searchOption']

        search_list = tag_search(selected_tags, search_option)

    searched_movie = {}
    index = 0
    for search in search_list:
        filtered_movie = Movie.query.filter(Movie.id == search).first()
        filtered_hashtags = hashcol.find_one({"movie_id": search})

        searched_movie[index] = {
            "movie_id": filtered_movie.id,
            "title": filtered_movie.title,
            "poster": filtered_movie.poster,
            "score": filtered_movie.score,
            "hashtags": {
                "total": filtered_hashtags["total"],
                "naver": filtered_hashtags["naver"],
                "daum": filtered_hashtags["daum"],
                "watcha": filtered_hashtags["watcha"],
                "cine21": filtered_hashtags["cine21"]
            }
        }

        index = index+1

    client.close()
    return jsonify(searched_movie)