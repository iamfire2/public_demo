from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required
from security import authenicate, identity

app = Flask(__name__)
app.secret_key = 'secret'
api = Api(app)

jwt = JWT(app, authenicate, identity) #/auth default api call for authenication for JWT

items = []

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

api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')

app.run(host='0.0.0.0', port=5000, debug=True)