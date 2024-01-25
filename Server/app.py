from flask import request, jsonify, make_response
from flask_restful import Resource

from Server.config import app, api, db
from Server.models import  User, Comment, Post, Vote
from Server.controllers.user_controllers import user_bp
from Server.controllers.post_controllers import post_bp
from Server.controllers.comment_controllers import comment_bp
from Server.controllers.votes_controllers import votes_bp


app.register_blueprint(user_bp)
app.register_blueprint(post_bp)
app.register_blueprint(comment_bp)
app.register_blueprint(votes_bp)


class Index(Resource):
    def get(self):
        return {"message": "Welcome to Moringa Api"}
    
api.add_resource(Index, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)