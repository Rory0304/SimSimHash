import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pymongo import MongoClient
import pymysql
pymysql.install_as_MySQLdb()

MONGO_URI = 'mongodb://kdt-vm-0202007.koreacentral.cloudapp.azure.com:21/'
MYSQL_URI = '''mysql://root:7teamghkdlxld@kdt-vm-0202007.koreacentral.cloudapp.azure.comd:5000/mysql?charset=utf8'''

def ranking_cal():
    engine = create_engine(MYSQL_URI)
    Session = sessionmaker(bind=engine)
    session = Session()

    ranking_list = {"collection": "ranking"}
    for i in range(1, 11):
        ranking_list[str(i)] = 1

    session.close()
    return ranking_list

def ranking_input():
    client = MongoClient(MONGO_URI)
    db = client.simsimhash
    col = db.ranking

    col.delete_one({"collection": "ranking"})
    col.insert_one(ranking_cal())

    client.close()
    return "0"

ranking_input()