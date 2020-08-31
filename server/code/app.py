from flask import Flask, render_template, make_response
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required
from flask_cors import CORS
from security import authenicate, identity
from datetime import timedelta

import requests

app = Flask(__name__)
CORS(app)
app.secret_key = 'secret'
api = Api(app)

jwt = JWT(app, authenicate, identity) #/auth default api call for authenication for JWT
app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=14400)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

items = []

class Home(Resource):
    def get(self):
        headers = {'Content-type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)

class Item(Resource):

    def price_arg_check(self):
        parser = reqparse.RequestParser()
        parser.add_argument('price', type=float, required=True, help='This field cannot be left blank.')
        return parser

    @jwt_required()
    def get(self, name):
        item = next(filter(lambda x: x.get('name') == name, items), None)
        if item:
            return item
        return {'message': 'Item not found'}, 404

    @jwt_required()
    def post(self, name):
        if next(filter(lambda x: x.get('name') == name, items), None) is not None:
            return {'message': 'Item already exists please provide unique name.'}, 400

        data = self.price_arg_check().parse_args()

        item = {'name':name, 'price' : data.get('price')}
        items.append(item)
        return item, 201

    @jwt_required()
    def put(self, name):
        data = self.price_arg_check().parse_args()
        item = next(filter(lambda x: x.get('name') == name, items), None)
        if item is None:
            item = {'name': name, 'price': data.get('price')}
            items.append(item)
        else:
            item.update(data)
        return item

    @jwt_required()
    def delete(self, name):
        global items
        items = list(filter(lambda x: x.get('name') != name, items))
        return {'message': 'Item delete {}'.format(name)}

class ItemList(Resource):
    @jwt_required()
    def get(self):
        return {'items': items}

class ToDos(Resource):
    @jwt_required()
    def get(self):
        req = requests.get('https://jsonplaceholder.typicode.com/todos')
        dataList = req.json()
        return dataList[0:11]

api.add_resource(ToDos, '/todos')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')
api.add_resource(Home, '/')

app.run(host='0.0.0.0', port=5000, debug=True)