from ..app import mongodb
class Review(mongodb.Document):
    movie_id = mongodb.IntField(required=True)
    rating = mongodb.IntField()
    content = mongodb.STringField(Required=True)
    write_date = mongodb.DateTimeField()
    source_site = mongodb.IntField()
    
    def to_json(self):
        return {"movie_id": self.movie_id,
                "rating": self.rating,
                "content": self.content,
                "write_date": self.write_date,
                "source_site": self.source_site}